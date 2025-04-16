import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, useTheme, ActivityIndicator } from 'react-native-paper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { AuthContext } from '../context/AuthContext';

const SocialLoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { login, loading, error } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = await GoogleSignin.getTokens();
      await login('google', idToken);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      Alert.alert(
        'Login Error',
        'Failed to sign in with Google. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      setIsLoading(true);
      // Implement GitHub OAuth flow
      const githubToken = await getGitHubToken();
      await login('github', githubToken);
    } catch (error) {
      console.error('GitHub Login Error:', error);
      Alert.alert(
        'Login Error',
        'Failed to sign in with GitHub. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkedInLogin = async () => {
    try {
      setIsLoading(true);
      // Implement LinkedIn OAuth flow
      const linkedInToken = await getLinkedInToken();
      await login('linkedin', linkedInToken);
    } catch (error) {
      console.error('LinkedIn Login Error:', error);
      Alert.alert(
        'Login Error',
        'Failed to sign in with LinkedIn. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Signing in...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Social Login</Text>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      
      <Button
        mode="contained"
        icon="google"
        onPress={handleGoogleLogin}
        style={[styles.button, { backgroundColor: '#DB4437' }]}
        labelStyle={styles.buttonLabel}
        disabled={loading}
      >
        Continue with Google
      </Button>

      <Button
        mode="contained"
        icon="github"
        onPress={handleGitHubLogin}
        style={[styles.button, { backgroundColor: '#24292e' }]}
        labelStyle={styles.buttonLabel}
        disabled={loading}
      >
        Continue with GitHub
      </Button>

      <Button
        mode="contained"
        icon="linkedin"
        onPress={handleLinkedInLogin}
        style={[styles.button, { backgroundColor: '#0077B5' }]}
        labelStyle={styles.buttonLabel}
        disabled={loading}
      >
        Continue with LinkedIn
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        disabled={loading}
      >
        Back to Login
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    marginBottom: 16,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    color: 'white',
  },
  backButton: {
    marginTop: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default SocialLoginScreen; 