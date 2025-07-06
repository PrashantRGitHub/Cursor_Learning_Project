# The Art of Living Clone - React + Node.js Application

A modern, responsive web application similar to The Art of Living website, built with React frontend and Node.js backend, featuring enquiry management, payment processing, and program management.

## 🌟 Features

### Frontend (React)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI/UX**: Beautiful animations with Framer Motion
- **Interactive Components**: 
  - Hero section with video background
  - Program showcase with filtering
  - Enquiry form with validation
  - Payment processing with Stripe
  - Testimonials and statistics
- **Performance Optimized**: React Query for data fetching, lazy loading
- **Accessibility**: WCAG compliant with proper focus management

### Backend (Node.js)
- **RESTful API**: Express.js with proper routing and middleware
- **Database Integration**: MongoDB with Mongoose ODM
- **Payment Processing**: Stripe integration for secure payments
- **Data Validation**: Express-validator for input validation
- **Security**: Helmet, CORS, rate limiting
- **Error Handling**: Comprehensive error handling and logging

### Key Functionalities
- ✅ User enquiry submission and management
- ✅ Program browsing and filtering
- ✅ Secure payment processing
- ✅ Admin dashboard for enquiries
- ✅ Responsive mobile design
- ✅ Real-time form validation
- ✅ Email notifications (configurable)
- ✅ Database storage and retrieval
- ✅ API rate limiting and security

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Stripe account (for payments)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd art-of-living-clone
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server && npm install
   
   # Install client dependencies
   cd ../client && npm install
   ```

3. **Environment Setup**

   Create `.env` file in the server directory:
   ```bash
   cd server
   cp env.example .env
   ```

   Update the `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/art-of-living

   # Client URL for CORS
   CLIENT_URL=http://localhost:3000

   # Stripe Configuration
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   ```

   Create `.env` file in the client directory:
   ```bash
   cd client
   echo "REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here" > .env
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB (if running locally)
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env file
   ```

5. **Start the application**
   ```bash
   # From root directory
   npm run dev
   
   # Or start separately:
   # Terminal 1: npm run server
   # Terminal 2: npm run client
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
art-of-living-clone/
├── client/                 # React frontend
│   ├── public/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Utility functions
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   ├── index.js           # Server entry point
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🔧 Configuration

### Stripe Setup
1. Create a Stripe account at https://stripe.com
2. Get your API keys from the dashboard
3. Update the environment variables with your keys
4. Set up webhook endpoints for payment confirmation

### MongoDB Setup
1. **Local MongoDB**:
   ```bash
   # Install MongoDB
   # Start MongoDB service
   mongod
   ```

2. **MongoDB Atlas (Recommended)**:
   - Create account at https://mongodb.com/atlas
   - Create a new cluster
   - Get connection string
   - Update MONGODB_URI in .env

### Email Configuration (Optional)
For email notifications, configure SMTP settings in `.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

Key mobile features:
- Touch-friendly navigation
- Swipe gestures
- Optimized forms
- Fast loading times
- Progressive Web App ready

## 🔒 Security Features

- **Input Validation**: Server-side validation with express-validator
- **CORS Protection**: Configured for specific origins
- **Helmet.js**: Security headers
- **Rate Limiting**: API rate limiting
- **Data Sanitization**: MongoDB injection protection
- **Secure Payments**: Stripe PCI compliance
- **Environment Variables**: Sensitive data protection

## 🧪 Testing

```bash
# Run frontend tests
cd client && npm test

# Run backend tests
cd server && npm test

# Run all tests
npm test
```

## 📊 API Endpoints

### Enquiries
- `POST /api/enquiries` - Create new enquiry
- `GET /api/enquiries` - Get all enquiries (admin)
- `GET /api/enquiries/:id` - Get enquiry by ID
- `PATCH /api/enquiries/:id/status` - Update enquiry status
- `GET /api/enquiries/stats/overview` - Get enquiry statistics

### Programs
- `GET /api/programs` - Get all programs
- `GET /api/programs/:id` - Get program by ID
- `POST /api/programs` - Create program (admin)
- `PUT /api/programs/:id` - Update program (admin)
- `DELETE /api/programs/:id` - Delete program (admin)
- `GET /api/programs/featured/list` - Get featured programs

### Payments
- `POST /api/payments/create-payment-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `POST /api/payments/webhook` - Stripe webhook
- `GET /api/payments/:id` - Get payment by ID
- `GET /api/payments` - Get all payments (admin)
- `POST /api/payments/:id/refund` - Refund payment

### Centers
- `GET /api/centers` - Get all centers
- `GET /api/centers/:id` - Get center by ID
- `GET /api/centers/city/:city` - Get centers by city
- `GET /api/centers/main/center` - Get main center

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the build folder
```

### Backend Deployment (Heroku/Railway)
```bash
cd server
# Set environment variables
# Deploy to your preferred platform
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
CLIENT_URL=https://your-domain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- The Art of Living Foundation for inspiration
- Stripe for payment processing
- MongoDB for database
- React and Node.js communities
- All contributors and supporters

## 📞 Support

For support and questions:
- Email: support@artofliving.org
- Phone: +91-80-28432321
- Website: https://www.artofliving.org

---

**Note**: This is a clone/educational project. For official Art of Living programs, please visit [www.artofliving.org](https://www.artofliving.org) 