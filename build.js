
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

console.log(`${colors.cyan}Starting build process...${colors.reset}`);

try {
  // Run build command
  console.log(`${colors.yellow}Building the project...${colors.reset}`);
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log(`${colors.green}Build completed successfully!${colors.reset}`);
  console.log(`${colors.cyan}Your files are ready in the 'dist' folder${colors.reset}`);
  console.log(`${colors.yellow}Instructions:${colors.reset}`);
  console.log(`1. Upload all contents of the 'dist' folder to your Plesk webhost`);
  console.log(`2. Make sure to configure your webserver to redirect all routes to index.html`);
  console.log(`   This is required for React Router to work properly.`);
  
} catch (error) {
  console.error(`${colors.red}Build failed:${colors.reset}`, error.message);
  process.exit(1);
}
