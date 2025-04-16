import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Switch, List, useTheme } from 'react-native-paper';
import { SettingsContext } from '../context/SettingsContext';

const NotificationsScreen = () => {
  const { colors } = useTheme();
  const { settings, updateSettings } = useContext(SettingsContext);
  const [notificationSettings, setNotificationSettings] = useState({
    systemAlerts: settings.notifications.systemAlerts,
    maintenanceReminders: settings.notifications.maintenanceReminders,
    batteryWarnings: settings.notifications.batteryWarnings,
    temperatureAlerts: settings.notifications.temperatureAlerts,
    operationUpdates: settings.notifications.operationUpdates,
  });

  const handleToggle = (setting) => {
    const newSettings = {
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    };
    setNotificationSettings(newSettings);
    updateSettings({
      ...settings,
      notifications: newSettings,
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Notification Preferences</Text>
      
      <List.Section>
        <List.Subheader>System Notifications</List.Subheader>
        <List.Item
          title="System Alerts"
          description="Critical system alerts and warnings"
          right={() => (
            <Switch
              value={notificationSettings.systemAlerts}
              onValueChange={() => handleToggle('systemAlerts')}
            />
          )}
        />
        <List.Item
          title="Maintenance Reminders"
          description="Scheduled maintenance notifications"
          right={() => (
            <Switch
              value={notificationSettings.maintenanceReminders}
              onValueChange={() => handleToggle('maintenanceReminders')}
            />
          )}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Sensor Alerts</List.Subheader>
        <List.Item
          title="Battery Warnings"
          description="Low battery level notifications"
          right={() => (
            <Switch
              value={notificationSettings.batteryWarnings}
              onValueChange={() => handleToggle('batteryWarnings')}
            />
          )}
        />
        <List.Item
          title="Temperature Alerts"
          description="High temperature warnings"
          right={() => (
            <Switch
              value={notificationSettings.temperatureAlerts}
              onValueChange={() => handleToggle('temperatureAlerts')}
            />
          )}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Operation Updates</List.Subheader>
        <List.Item
          title="Operation Status"
          description="Updates about ongoing operations"
          right={() => (
            <Switch
              value={notificationSettings.operationUpdates}
              onValueChange={() => handleToggle('operationUpdates')}
            />
          )}
        />
      </List.Section>
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
});

export default NotificationsScreen; 