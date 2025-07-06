#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up The Art of Living Clone...\n');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkNodeVersion() {
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  if (majorVersion < 16) {
    log('❌ Node.js version 16 or higher is required', 'red');
    log(`Current version: ${nodeVersion}`, 'yellow');
    process.exit(1);
  }
  
  log(`✅ Node.js version: ${nodeVersion}`, 'green');
}

function installDependencies() {
  log('\n📦 Installing dependencies...', 'blue');
  
  try {
    // Install root dependencies
    log('Installing root dependencies...', 'yellow');
    execSync('npm install', { stdio: 'inherit' });
    
    // Install server dependencies
    log('Installing server dependencies...', 'yellow');
    execSync('cd server && npm install', { stdio: 'inherit' });
    
    // Install client dependencies
    log('Installing client dependencies...', 'yellow');
    execSync('cd client && npm install', { stdio: 'inherit' });
    
    log('✅ All dependencies installed successfully!', 'green');
  } catch (error) {
    log('❌ Failed to install dependencies', 'red');
    log(error.message, 'red');
    process.exit(1);
  }
}

function createEnvFiles() {
  log('\n🔧 Creating environment files...', 'blue');
  
  const serverEnvPath = path.join(__dirname, 'server', '.env');
  const clientEnvPath = path.join(__dirname, 'client', '.env');
  
  // Server .env
  if (!fs.existsSync(serverEnvPath)) {
    const serverEnvContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/art-of-living

# Client URL for CORS
CLIENT_URL=http://localhost:3000

# Stripe Configuration (Replace with your keys)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
`;
    
    fs.writeFileSync(serverEnvPath, serverEnvContent);
    log('✅ Created server/.env', 'green');
  } else {
    log('ℹ️  server/.env already exists', 'yellow');
  }
  
  // Client .env
  if (!fs.existsSync(clientEnvPath)) {
    const clientEnvContent = `# Stripe Configuration (Replace with your publishable key)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
`;
    
    fs.writeFileSync(clientEnvPath, clientEnvContent);
    log('✅ Created client/.env', 'green');
  } else {
    log('ℹ️  client/.env already exists', 'yellow');
  }
}

function createDirectories() {
  log('\n📁 Creating necessary directories...', 'blue');
  
  const dirs = [
    'server/uploads',
    'server/logs'
  ];
  
  dirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      log(`✅ Created ${dir}`, 'green');
    } else {
      log(`ℹ️  ${dir} already exists`, 'yellow');
    }
  });
}

function displayNextSteps() {
  log('\n🎉 Setup completed successfully!', 'green');
  log('\n📋 Next steps:', 'blue');
  log('1. Configure your environment variables in server/.env and client/.env', 'yellow');
  log('2. Set up MongoDB (local or MongoDB Atlas)', 'yellow');
  log('3. Get your Stripe API keys from https://stripe.com', 'yellow');
  log('4. Start the application:', 'yellow');
  log('   npm run dev', 'green');
  log('\n📚 For detailed instructions, see README.md', 'blue');
  log('\n🌐 The application will be available at:', 'blue');
  log('   Frontend: http://localhost:3000', 'green');
  log('   Backend:  http://localhost:5000', 'green');
}

function main() {
  try {
    checkNodeVersion();
    installDependencies();
    createEnvFiles();
    createDirectories();
    displayNextSteps();
  } catch (error) {
    log('❌ Setup failed', 'red');
    log(error.message, 'red');
    process.exit(1);
  }
}

// Run setup
main(); 