const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');
const Enquiry = require('../models/Enquiry');
const Program = require('../models/Program');
const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { enquiryId, programId, amount, currency = 'inr' } = req.body;

    // Validate enquiry and program
    const enquiry = await Enquiry.findById(enquiryId);
    const program = await Program.findById(programId);

    if (!enquiry || !program) {
      return res.status(404).json({
        error: 'Enquiry or program not found'
      });
    }

    // Create or get Stripe customer
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: enquiry.email,
      limit: 1
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: enquiry.email,
        name: enquiry.name,
        phone: enquiry.phone,
        metadata: {
          enquiryId: enquiryId.toString()
        }
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      customer: customer.id,
      metadata: {
        enquiryId: enquiryId.toString(),
        programId: programId.toString(),
        customerName: enquiry.name,
        customerEmail: enquiry.email,
        programName: program.name
      },
      description: `Payment for ${program.name} - ${enquiry.name}`,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Create payment record
    const payment = new Payment({
      enquiryId,
      programId,
      amount,
      currency,
      stripePaymentIntentId: paymentIntent.id,
      stripeCustomerId: customer.id,
      status: 'pending',
      metadata: {
        customerName: enquiry.name,
        customerEmail: enquiry.email,
        customerPhone: enquiry.phone,
        programName: program.name
      }
    });

    await payment.save();

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id,
      customerId: customer.id
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({
      error: 'Failed to create payment intent',
      message: 'Please try again later'
    });
  }
});

// Confirm payment
router.post('/confirm', async (req, res) => {
  try {
    const { paymentIntentId, paymentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      // Update payment status
      const payment = await Payment.findByIdAndUpdate(
        paymentId,
        {
          status: 'completed',
          transactionId: paymentIntent.charges.data[0]?.id,
          receiptUrl: paymentIntent.charges.data[0]?.receipt_url
        },
        { new: true }
      );

      // Update enquiry status
      await Enquiry.findByIdAndUpdate(
        payment.enquiryId,
        { status: 'enrolled' }
      );

      res.json({
        success: true,
        message: 'Payment completed successfully',
        data: payment
      });
    } else {
      res.status(400).json({
        error: 'Payment not completed',
        status: paymentIntent.status
      });
    }
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({
      error: 'Failed to confirm payment',
      message: 'Please try again later'
    });
  }
});

// Stripe webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        
        // Update payment status
        await Payment.findOneAndUpdate(
          { stripePaymentIntentId: paymentIntent.id },
          {
            status: 'completed',
            transactionId: paymentIntent.charges.data[0]?.id,
            receiptUrl: paymentIntent.charges.data[0]?.receipt_url
          }
        );

        // Update enquiry status
        const payment = await Payment.findOne({ stripePaymentIntentId: paymentIntent.id });
        if (payment) {
          await Enquiry.findByIdAndUpdate(
            payment.enquiryId,
            { status: 'enrolled' }
          );
        }
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        
        await Payment.findOneAndUpdate(
          { stripePaymentIntentId: failedPayment.id },
          {
            status: 'failed',
            failureReason: failedPayment.last_payment_error?.message || 'Payment failed'
          }
        );
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Get payment by ID
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('enquiryId')
      .populate('programId');

    if (!payment) {
      return res.status(404).json({
        error: 'Payment not found'
      });
    }

    res.json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Get payment error:', error);
    res.status(500).json({
      error: 'Failed to fetch payment',
      message: 'Please try again later'
    });
  }
});

// Get all payments (admin only)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, paymentMethod } = req.query;

    const query = {};
    if (status) query.status = status;
    if (paymentMethod) query.paymentMethod = paymentMethod;

    const payments = await Payment.find(query)
      .populate('enquiryId')
      .populate('programId')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Payment.countDocuments(query);

    res.json({
      success: true,
      data: payments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({
      error: 'Failed to fetch payments',
      message: 'Please try again later'
    });
  }
});

// Refund payment
router.post('/:id/refund', async (req, res) => {
  try {
    const { amount, reason } = req.body;
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        error: 'Payment not found'
      });
    }

    if (payment.status !== 'completed') {
      return res.status(400).json({
        error: 'Only completed payments can be refunded'
      });
    }

    // Process refund through Stripe
    const refund = await stripe.refunds.create({
      payment_intent: payment.stripePaymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined,
      reason: 'requested_by_customer'
    });

    // Update payment record
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        status: 'refunded',
        refundAmount: amount || payment.amount,
        refundReason: reason,
        refundedAt: new Date()
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Refund processed successfully',
      data: updatedPayment
    });
  } catch (error) {
    console.error('Refund error:', error);
    res.status(500).json({
      error: 'Failed to process refund',
      message: 'Please try again later'
    });
  }
});

module.exports = router; 