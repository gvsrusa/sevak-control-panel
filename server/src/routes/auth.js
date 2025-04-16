const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validate } = require('../middleware/validator');
const { schemas } = require('../middleware/validator');
const User = require('../models/User');
const config = require('../config');

// Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// LinkedIn OAuth configuration
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Google authentication
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    
    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Find or create user
    let user = await User.findOne({ googleId });
    
    if (!user) {
      user = await User.create({
        googleId,
        email,
        name,
        profilePicture: picture,
        provider: 'google',
      });
    }

    // Generate JWT token
    const accessToken = generateToken(user);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// GitHub authentication
router.post('/github', async (req, res) => {
  try {
    const { token } = req.body;

    // Exchange code for access token
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: token,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const { access_token } = response.data;

    // Get user info from GitHub
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    const { id: githubId, login, email, avatar_url } = userResponse.data;

    // Find or create user
    let user = await User.findOne({ githubId });
    
    if (!user) {
      user = await User.create({
        githubId,
        email: email || `${login}@github.com`,
        name: login,
        profilePicture: avatar_url,
        provider: 'github',
      });
    }

    // Generate JWT token
    const accessToken = generateToken(user);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
    });
  } catch (error) {
    console.error('GitHub auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// LinkedIn authentication
router.post('/linkedin', async (req, res) => {
  try {
    const { token } = req.body;

    // Exchange code for access token
    const response = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      {
        grant_type: 'authorization_code',
        code: token,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
      }
    );

    const { access_token } = response.data;

    // Get user info from LinkedIn
    const userResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const emailResponse = await axios.get(
      'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { id: linkedinId, localizedFirstName, localizedLastName } = userResponse.data;
    const email = emailResponse.data.elements[0]['handle~'].emailAddress;

    // Find or create user
    let user = await User.findOne({ linkedinId });
    
    if (!user) {
      user = await User.create({
        linkedinId,
        email,
        name: `${localizedFirstName} ${localizedLastName}`,
        provider: 'linkedin',
      });
    }

    // Generate JWT token
    const accessToken = generateToken(user);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
    });
  } catch (error) {
    console.error('LinkedIn auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    // In a real application, you might want to:
    // 1. Blacklist the token
    // 2. Clear session data
    // 3. Revoke social provider tokens
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

// Register new user
router.post('/register', validate(schemas.createUser), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.error('User already exists', 400);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.server.jwtSecret,
      { expiresIn: config.server.jwtExpiresIn }
    );

    res.success(
      { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token },
      'User registered successfully',
      201
    );
  } catch (error) {
    res.error(error.message, 500);
  }
});

// Login user
router.post('/login', validate(schemas.login), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.error('Invalid credentials', 401);
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.error('Invalid credentials', 401);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.server.jwtSecret,
      { expiresIn: config.server.jwtExpiresIn }
    );

    res.success(
      { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token },
      'Login successful'
    );
  } catch (error) {
    res.error(error.message, 500);
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.unauthorized('No token provided');
    }

    const decoded = jwt.verify(token, config.server.jwtSecret);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.notFound('User not found');
    }

    res.success(user);
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.unauthorized('Invalid token');
    }
    if (error.name === 'TokenExpiredError') {
      return res.unauthorized('Token expired');
    }
    res.error(error.message, 500);
  }
});

// Refresh token
router.post('/refresh', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.unauthorized('No token provided');
    }

    const decoded = jwt.verify(token, config.server.jwtSecret);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.notFound('User not found');
    }

    // Generate new token
    const newToken = jwt.sign(
      { id: user._id, role: user.role },
      config.server.jwtSecret,
      { expiresIn: config.server.jwtExpiresIn }
    );

    res.success({ token: newToken }, 'Token refreshed successfully');
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.unauthorized('Invalid token');
    }
    if (error.name === 'TokenExpiredError') {
      return res.unauthorized('Token expired');
    }
    res.error(error.message, 500);
  }
});

module.exports = router; 