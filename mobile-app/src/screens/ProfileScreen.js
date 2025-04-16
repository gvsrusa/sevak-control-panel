import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, TextInput, Button, useTheme, Avatar } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const { colors } = useTheme();
  const { user, updateProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    organization: user?.organization || '',
  });

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Avatar.Image
          size={100}
          source={{ uri: user?.avatar || 'https://via.placeholder.com/100' }}
        />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.role}>{user?.role}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <TextInput
          label="Name"
          value={formData.name}
          onChangeText={(value) => handleChange('name', value)}
          disabled={!isEditing}
          style={styles.input}
        />
        <TextInput
          label="Email"
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
          disabled={!isEditing}
          style={styles.input}
        />
        <TextInput
          label="Phone"
          value={formData.phone}
          onChangeText={(value) => handleChange('phone', value)}
          disabled={!isEditing}
          style={styles.input}
        />
        <TextInput
          label="Organization"
          value={formData.organization}
          onChangeText={(value) => handleChange('organization', value)}
          disabled={!isEditing}
          style={styles.input}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('ChangePassword')}
          style={styles.button}
        >
          Change Password
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Notifications')}
          style={styles.button}
        >
          Notification Preferences
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('TwoFactorAuth')}
          style={styles.button}
        >
          Two-Factor Authentication
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('ConnectedDevices')}
          style={styles.button}
        >
          Connected Devices
        </Button>
      </View>

      <View style={styles.actions}>
        {isEditing ? (
          <>
            <Button
              mode="contained"
              onPress={handleSave}
              style={[styles.button, { marginRight: 8 }]}
            >
              Save Changes
            </Button>
            <Button
              mode="outlined"
              onPress={() => {
                setIsEditing(false);
                setFormData({
                  name: user?.name || '',
                  email: user?.email || '',
                  phone: user?.phone || '',
                  organization: user?.organization || '',
                });
              }}
              style={styles.button}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            mode="contained"
            onPress={() => setIsEditing(true)}
            style={styles.button}
          >
            Edit Profile
          </Button>
        )}
      </View>
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
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  role: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default ProfileScreen; 