import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const PrivacyScreen = () => {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Privacy Policy</Text>
      
      <Text style={styles.sectionTitle}>1. Information We Collect</Text>
      <Text style={styles.text}>
        We collect information that you provide directly to us, including your name, email address, phone number, and other contact information. We also collect information about your use of the Sevak Control Panel, including device information, usage statistics, and error reports.
      </Text>

      <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
      <Text style={styles.text}>
        We use the information we collect to provide, maintain, and improve the Sevak Control Panel, to communicate with you about your account, and to send you technical notices, updates, security alerts, and support messages.
      </Text>

      <Text style={styles.sectionTitle}>3. Information Sharing</Text>
      <Text style={styles.text}>
        We do not share your personal information with third parties except as described in this policy. We may share your information with service providers who assist us in operating the Sevak Control Panel, conducting our business, or servicing you.
      </Text>

      <Text style={styles.sectionTitle}>4. Data Security</Text>
      <Text style={styles.text}>
        We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
      </Text>

      <Text style={styles.sectionTitle}>5. Your Rights</Text>
      <Text style={styles.text}>
        You have the right to access, correct, or delete your personal information. You can also object to the processing of your personal information, ask us to restrict processing of your personal information, or request portability of your personal information.
      </Text>

      <Text style={styles.sectionTitle}>6. Cookies and Tracking</Text>
      <Text style={styles.text}>
        We use cookies and similar tracking technologies to track activity on the Sevak Control Panel and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
      </Text>

      <Text style={styles.sectionTitle}>7. Changes to This Policy</Text>
      <Text style={styles.text}>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
      </Text>

      <Text style={styles.sectionTitle}>8. Contact Us</Text>
      <Text style={styles.text}>
        If you have any questions about this Privacy Policy, please contact us at privacy@sevak.com.
      </Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
});

export default PrivacyScreen; 