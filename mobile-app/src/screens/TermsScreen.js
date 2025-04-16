import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const TermsScreen = () => {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Terms of Service</Text>
      
      <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
      <Text style={styles.text}>
        By accessing and using the Sevak Control Panel mobile application, you accept and agree to be bound by the terms and provision of this agreement.
      </Text>

      <Text style={styles.sectionTitle}>2. Use License</Text>
      <Text style={styles.text}>
        Permission is granted to temporarily use the Sevak Control Panel for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
      </Text>

      <Text style={styles.sectionTitle}>3. Disclaimer</Text>
      <Text style={styles.text}>
        The materials on the Sevak Control Panel are provided on an 'as is' basis. Sevak makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
      </Text>

      <Text style={styles.sectionTitle}>4. Limitations</Text>
      <Text style={styles.text}>
        In no event shall Sevak or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the Sevak Control Panel.
      </Text>

      <Text style={styles.sectionTitle}>5. Revisions and Errata</Text>
      <Text style={styles.text}>
        The materials appearing on the Sevak Control Panel could include technical, typographical, or photographic errors. Sevak does not warrant that any of the materials on its application are accurate, complete, or current.
      </Text>

      <Text style={styles.sectionTitle}>6. Links</Text>
      <Text style={styles.text}>
        Sevak has not reviewed all of the sites linked to its application and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Sevak of the site.
      </Text>

      <Text style={styles.sectionTitle}>7. Governing Law</Text>
      <Text style={styles.text}>
        These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
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

export default TermsScreen; 