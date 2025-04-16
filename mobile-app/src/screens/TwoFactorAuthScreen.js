import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, useTheme, QRCode } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

const TwoFactorAuthScreen = () => {
  const { colors } = useTheme();
  const { user, enable2FA, disable2FA, verify2FA } = useContext(AuthContext);
  const [secret, setSecret] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(user.twoFactorEnabled ? 'enabled' : 'setup');

  const handleEnable2FA = async () => {
    setLoading(true);
    try {
      const newSecret = await enable2FA();
      setSecret(newSecret);
      setStep('verify');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify2FA = async () => {
    if (!verificationCode) {
      setError('Please enter the verification code');
      return;
    }

    setLoading(true);
    try {
      await verify2FA(secret, verificationCode);
      setStep('enabled');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    setLoading(true);
    try {
      await disable2FA();
      setStep('setup');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Two-Factor Authentication</Text>

      {step === 'setup' && (
        <View style={styles.section}>
          <Text style={styles.description}>
            Two-factor authentication adds an extra layer of security to your account.
            When enabled, you'll need to enter a verification code from your
            authenticator app in addition to your password when signing in.
          </Text>
          <Button
            mode="contained"
            onPress={handleEnable2FA}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Enable 2FA
          </Button>
        </View>
      )}

      {step === 'verify' && (
        <View style={styles.section}>
          <Text style={styles.description}>
            Scan this QR code with your authenticator app:
          </Text>
          <View style={styles.qrContainer}>
            <QRCode value={secret} size={200} />
          </View>
          <TextInput
            label="Verification Code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleVerify2FA}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Verify
          </Button>
        </View>
      )}

      {step === 'enabled' && (
        <View style={styles.section}>
          <Text style={styles.successText}>
            Two-factor authentication is enabled for your account.
          </Text>
          <Button
            mode="outlined"
            onPress={handleDisable2FA}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Disable 2FA
          </Button>
        </View>
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default TwoFactorAuthScreen; 