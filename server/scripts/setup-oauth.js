const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envPath = path.join(__dirname, '../.env');

console.log('Welcome to the OAuth Setup Wizard!');
console.log('This script will help you set up your OAuth applications and update your .env file.');
console.log('Please follow the instructions for each provider.\n');

const questions = {
  google: [
    {
      question: 'Enter your Google Client ID: ',
      envVar: 'GOOGLE_CLIENT_ID'
    },
    {
      question: 'Enter your Google Client Secret: ',
      envVar: 'GOOGLE_CLIENT_SECRET'
    }
  ],
  github: [
    {
      question: 'Enter your GitHub Client ID: ',
      envVar: 'GITHUB_CLIENT_ID'
    },
    {
      question: 'Enter your GitHub Client Secret: ',
      envVar: 'GITHUB_CLIENT_SECRET'
    }
  ],
  linkedin: [
    {
      question: 'Enter your LinkedIn Client ID: ',
      envVar: 'LINKEDIN_CLIENT_ID'
    },
    {
      question: 'Enter your LinkedIn Client Secret: ',
      envVar: 'LINKEDIN_CLIENT_SECRET'
    },
    {
      question: 'Enter your LinkedIn Redirect URI (e.g., your-app://linkedin-auth): ',
      envVar: 'LINKEDIN_REDIRECT_URI'
    }
  ]
};

const answers = {};

function askQuestion(provider, index) {
  if (index >= questions[provider].length) {
    if (provider === 'google') {
      askQuestion('github', 0);
    } else if (provider === 'github') {
      askQuestion('linkedin', 0);
    } else {
      saveToEnv();
      rl.close();
    }
    return;
  }

  const question = questions[provider][index];
  rl.question(question.question, (answer) => {
    answers[question.envVar] = answer;
    askQuestion(provider, index + 1);
  });
}

function saveToEnv() {
  let envContent = '';
  
  // Read existing .env file if it exists
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // Update or add OAuth credentials
  for (const [key, value] of Object.entries(answers)) {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (envContent.match(regex)) {
      envContent = envContent.replace(regex, `${key}=${value}`);
    } else {
      envContent += `\n${key}=${value}`;
    }
  }

  // Write back to .env file
  fs.writeFileSync(envPath, envContent.trim() + '\n');

  console.log('\nOAuth credentials have been saved to .env file.');
  console.log('Please make sure to:');
  console.log('1. Keep your .env file secure and never commit it to version control');
  console.log('2. Set up the corresponding OAuth applications in each provider\'s developer console');
  console.log('3. Configure the authorized redirect URIs in each provider\'s settings');
}

// Start with Google OAuth setup
console.log('=== Google OAuth Setup ===');
console.log('1. Go to https://console.cloud.google.com');
console.log('2. Create a new project or select an existing one');
console.log('3. Enable the Google Sign-In API');
console.log('4. Create OAuth 2.0 credentials');
console.log('5. Add authorized redirect URIs:');
console.log('   - For development: http://localhost:3000/api/auth/google/callback');
console.log('   - For production: https://your-domain.com/api/auth/google/callback\n');

askQuestion('google', 0); 