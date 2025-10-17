#!/usr/bin/env node

/**
 * Portfolio Setup Verification Script
 * Run this after installation to verify everything is configured correctly
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.cyan}${msg}${colors.reset}`),
};

let errorCount = 0;
let warningCount = 0;

// Check if file exists
function fileExists(filePath) {
  return fs.existsSync(path.join(__dirname, filePath));
}

// Check if directory exists
function dirExists(dirPath) {
  return fs.existsSync(path.join(__dirname, dirPath)) && 
         fs.statSync(path.join(__dirname, dirPath)).isDirectory();
}

// Read file content
function readFile(filePath) {
  try {
    return fs.readFileSync(path.join(__dirname, filePath), 'utf8');
  } catch (error) {
    return null;
  }
}

// Check package.json dependencies
function checkDependencies() {
  log.section('Checking Dependencies...');
  
  if (!fileExists('package.json')) {
    log.error('package.json not found');
    errorCount++;
    return;
  }

  const packageJson = JSON.parse(readFile('package.json'));
  const requiredDeps = [
    'next',
    'react',
    'react-dom',
    'framer-motion',
    'lucide-react',
    'react-intersection-observer',
  ];

  const requiredDevDeps = [
    'typescript',
    'tailwindcss',
    'autoprefixer',
    'postcss',
  ];

  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      log.success(`${dep} installed`);
    } else {
      log.error(`${dep} is missing`);
      errorCount++;
    }
  });

  requiredDevDeps.forEach(dep => {
    if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      log.success(`${dep} installed (dev)`);
    } else {
      log.error(`${dep} is missing (dev)`);
      errorCount++;
    }
  });
}

// Check configuration files
function checkConfigFiles() {
  log.section('Checking Configuration Files...');

  const configFiles = [
    'next.config.js',
    'tailwind.config.ts',
    'tsconfig.json',
    'postcss.config.js',
    '.gitignore',
  ];

  configFiles.forEach(file => {
    if (fileExists(file)) {
      log.success(`${file} exists`);
    } else {
      log.error(`${file} is missing`);
      errorCount++;
    }
  });
}

// Check environment variables
function checkEnvironment() {
  log.section('Checking Environment Variables...');

  if (fileExists('.env.local')) {
    log.success('.env.local exists');
    
    const envContent = readFile('.env.local');
    
    if (envContent.includes('NEXT_PUBLIC_GITHUB_USERNAME')) {
      log.success('NEXT_PUBLIC_GITHUB_USERNAME is set');
    } else {
      log.error('NEXT_PUBLIC_GITHUB_USERNAME is not set');
      errorCount++;
    }

    if (envContent.includes('NEXT_PUBLIC_GITHUB_TOKEN')) {
      log.success('NEXT_PUBLIC_GITHUB_TOKEN is set (optional)');
    } else {
      log.warning('NEXT_PUBLIC_GITHUB_TOKEN is not set (recommended for higher API limits)');
      warningCount++;
    }
  } else {
    log.error('.env.local not found');
    log.info('Create .env.local from .env.local.example');
    errorCount++;
  }
}

// Check directory structure
function checkDirectories() {
  log.section('Checking Directory Structure...');

  const requiredDirs = [
    'app',
    'components',
    'lib',
    'public',
  ];

  requiredDirs.forEach(dir => {
    if (dirExists(dir)) {
      log.success(`${dir}/ directory exists`);
    } else {
      log.error(`${dir}/ directory is missing`);
      errorCount++;
    }
  });
}

// Check component files
function checkComponents() {
  log.section('Checking Component Files...');

  const components = [
    'components/Header.tsx',
    'components/Hero.tsx',
    'components/About.tsx',
    'components/Services.tsx',
    'components/Projects.tsx',
    'components/Skills.tsx',
    'components/Contact.tsx',
    'components/Footer.tsx',
  ];

  components.forEach(component => {
    if (fileExists(component)) {
      log.success(`${component} exists`);
    } else {
      log.error(`${component} is missing`);
      errorCount++;
    }
  });
}

// Check app files
function checkAppFiles() {
  log.section('Checking App Files...');

  const appFiles = [
    'app/layout.tsx',
    'app/page.tsx',
    'app/globals.css',
    'app/robots.ts',
    'app/sitemap.ts',
    'app/manifest.ts',
  ];

  appFiles.forEach(file => {
    if (fileExists(file)) {
      log.success(`${file} exists`);
    } else {
      log.error(`${file} is missing`);
      errorCount++;
    }
  });
}

// Check lib files
function checkLibFiles() {
  log.section('Checking Library Files...');

  if (fileExists('lib/github.ts')) {
    log.success('lib/github.ts exists');
  } else {
    log.error('lib/github.ts is missing');
    errorCount++;
  }
}

// Check node_modules
function checkNodeModules() {
  log.section('Checking Installation...');

  if (dirExists('node_modules')) {
    log.success('node_modules directory exists');
    log.info('Dependencies appear to be installed');
  } else {
    log.warning('node_modules not found');
    log.info('Run: npm install');
    warningCount++;
  }
}

// Check documentation
function checkDocumentation() {
  log.section('Checking Documentation...');

  const docs = [
    'README.md',
    'SETUP.md',
    'DEPLOYMENT.md',
    'QUICKSTART.md',
    'CUSTOMIZATION.md',
    'LICENSE',
  ];

  docs.forEach(doc => {
    if (fileExists(doc)) {
      log.success(`${doc} exists`);
    } else {
      log.warning(`${doc} is missing`);
      warningCount++;
    }
  });
}

// Main verification
function runVerification() {
  console.log(`
${colors.cyan}╔════════════════════════════════════════════╗
║   Portfolio Setup Verification Script     ║
╚════════════════════════════════════════════╝${colors.reset}
`);

  checkDependencies();
  checkConfigFiles();
  checkEnvironment();
  checkDirectories();
  checkComponents();
  checkAppFiles();
  checkLibFiles();
  checkNodeModules();
  checkDocumentation();

  // Summary
  console.log(`
${colors.cyan}╔════════════════════════════════════════════╗
║              Verification Summary          ║
╚════════════════════════════════════════════╝${colors.reset}
`);

  if (errorCount === 0 && warningCount === 0) {
    log.success('All checks passed! Your setup is complete.');
    console.log(`\n${colors.green}✨ Ready to start development!${colors.reset}`);
    console.log(`\nRun: ${colors.yellow}npm run dev${colors.reset}`);
  } else {
    if (errorCount > 0) {
      log.error(`Found ${errorCount} error(s)`);
    }
    if (warningCount > 0) {
      log.warning(`Found ${warningCount} warning(s)`);
    }

    console.log(`\n${colors.yellow}⚠ Please fix the issues above before proceeding.${colors.reset}`);
    
    if (errorCount > 0) {
      console.log(`\n${colors.blue}Quick fixes:${colors.reset}`);
      console.log('1. Run: npm install');
      console.log('2. Create .env.local from .env.local.example');
      console.log('3. Check that all files were extracted correctly');
    }
  }

  console.log(`\n${colors.cyan}Need help? Check:${colors.reset}`);
  console.log('- README.md for complete documentation');
  console.log('- QUICKSTART.md for quick setup guide');
  console.log('- SETUP.md for detailed setup instructions\n');
}

// Run the verification
runVerification();
