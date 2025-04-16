import React, { useState, useContext } from 'react';
import { View, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Text, List, Divider, useTheme } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import { SettingsContext } from '../context/SettingsContext';

const SettingsScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { logout } = useContext(AuthContext);
  const { settings, updateSettings } = useContext(SettingsContext);
  const [notifications, setNotifications] = useState(settings.notifications);
  const [darkMode, setDarkMode] = useState(settings.darkMode);
  const [autoConnect, setAutoConnect] = useState(settings.autoConnect);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNotificationToggle = (value) => {
    setNotifications(value);
    updateSettings({ ...settings, notifications: value });
  };

  const handleDarkModeToggle = (value) => {
    setDarkMode(value);
    updateSettings({ ...settings, darkMode: value });
  };

  const handleAutoConnectToggle = (value) => {
    setAutoConnect(value);
    updateSettings({ ...settings, autoConnect: value });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <List.Section>
        <List.Subheader>App Settings</List.Subheader>
        <List.Item
          title="Notifications"
          description="Enable/disable push notifications"
          right={() => (
            <Switch
              value={notifications}
              onValueChange={handleNotificationToggle}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Dark Mode"
          description="Toggle dark theme"
          right={() => (
            <Switch
              value={darkMode}
              onValueChange={handleDarkModeToggle}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Auto-connect"
          description="Automatically connect to tractor"
          right={() => (
            <Switch
              value={autoConnect}
              onValueChange={handleAutoConnectToggle}
            />
          )}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Account</List.Subheader>
        <List.Item
          title="Profile"
          description="View and edit your profile"
          onPress={() => navigation.navigate('Profile')}
          right={() => <List.Icon icon="chevron-right" />}
        />
        <Divider />
        <List.Item
          title="Change Password"
          description="Update your password"
          onPress={() => navigation.navigate('ChangePassword')}
          right={() => <List.Icon icon="chevron-right" />}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>About</List.Subheader>
        <List.Item
          title="Version"
          description="1.0.0"
        />
        <Divider />
        <List.Item
          title="Terms of Service"
          onPress={() => navigation.navigate('Terms')}
          right={() => <List.Icon icon="chevron-right" />}
        />
        <Divider />
        <List.Item
          title="Privacy Policy"
          onPress={() => navigation.navigate('Privacy')}
          right={() => <List.Icon icon="chevron-right" />}
        />
      </List.Section>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: colors.error }]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutButton: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen; 