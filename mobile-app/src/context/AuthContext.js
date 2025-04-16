import React, { createContext, useState, useContext } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_CONFIG, GITHUB_CONFIG, LINKEDIN_CONFIG } from '../utils/socialLoginConfig';
import { API_BASE_URL } from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize Google Sign-In
  React.useEffect(() => {
    GoogleSignin.configure(GOOGLE_CONFIG);
  }, []);

  const login = async (provider, token) => {
    setLoading(true);
    setError(null);
    try {
      let userData;
      
      switch (provider) {
        case 'google':
          userData = await handleGoogleLogin(token);
          break;
        case 'github':
          userData = await handleGitHubLogin(token);
          break;
        case 'linkedin':
          userData = await handleLinkedInLogin(token);
          break;
        default:
          throw new Error('Invalid provider');
      }

      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error('Google login failed');
      }

      const data = await response.json();
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        provider: 'google',
        accessToken: data.accessToken,
      };
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const handleGitHubLogin = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/github`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error('GitHub login failed');
      }

      const data = await response.json();
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        provider: 'github',
        accessToken: data.accessToken,
      };
    } catch (error) {
      console.error('GitHub login error:', error);
      throw error;
    }
  };

  const handleLinkedInLogin = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/linkedin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error('LinkedIn login failed');
      }

      const data = await response.json();
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        provider: 'linkedin',
        accessToken: data.accessToken,
      };
    } catch (error) {
      console.error('LinkedIn login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      // Clear any provider-specific sessions
      await GoogleSignin.signOut();
      
      // Call backend logout endpoint
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user?.accessToken}`,
        },
      });

      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 