export const GOOGLE_CONFIG = {
  webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID', // Replace with your Google OAuth client ID
  offlineAccess: true,
};

export const GITHUB_CONFIG = {
  clientId: 'YOUR_GITHUB_CLIENT_ID', // Replace with your GitHub OAuth client ID
  clientSecret: 'YOUR_GITHUB_CLIENT_SECRET', // Replace with your GitHub OAuth client secret
  redirectUri: 'YOUR_APP_SCHEME://github-auth', // Replace with your app's custom URL scheme
  scopes: ['user', 'repo'],
};

export const LINKEDIN_CONFIG = {
  clientId: 'YOUR_LINKEDIN_CLIENT_ID', // Replace with your LinkedIn OAuth client ID
  clientSecret: 'YOUR_LINKEDIN_CLIENT_SECRET', // Replace with your LinkedIn OAuth client secret
  redirectUri: 'YOUR_APP_SCHEME://linkedin-auth', // Replace with your app's custom URL scheme
  scopes: ['r_liteprofile', 'r_emailaddress'],
}; 