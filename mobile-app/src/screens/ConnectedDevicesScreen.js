import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, List, Button, useTheme, IconButton } from 'react-native-paper';
import { useTractor } from '../context/TractorContext';

const ConnectedDevicesScreen = () => {
  const { colors } = useTheme();
  const { tractorData, refreshData } = useTractor();
  const [refreshing, setRefreshing] = useState(false);
  const [devices, setDevices] = useState([]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshData();
      updateDevices();
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
    setRefreshing(false);
  };

  const updateDevices = () => {
    // Simulate device data - replace with actual API call
    const newDevices = [
      {
        id: '1',
        name: 'Sevak Tractor',
        type: 'tractor',
        status: 'connected',
        lastSeen: new Date(),
        battery: 85,
      },
      {
        id: '2',
        name: 'Mobile Controller',
        type: 'controller',
        status: 'connected',
        lastSeen: new Date(),
        battery: 65,
      },
    ];

    setDevices(newDevices);
  };

  useEffect(() => {
    updateDevices();
  }, [tractorData]);

  const handleDisconnect = (deviceId) => {
    // Add disconnect functionality
    console.log(`Disconnecting device ${deviceId}`);
  };

  const renderDeviceItem = (device) => (
    <List.Item
      key={device.id}
      title={device.name}
      description={`Type: ${device.type} | Battery: ${device.battery}%`}
      left={() => (
        <IconButton
          icon={device.type === 'tractor' ? 'tractor' : 'cellphone'}
          size={24}
          style={styles.deviceIcon}
        />
      )}
      right={() => (
        <View style={styles.deviceActions}>
          <Text
            style={[
              styles.statusText,
              { color: device.status === 'connected' ? 'green' : 'red' },
            ]}
          >
            {device.status}
          </Text>
          <IconButton
            icon="disconnect"
            size={24}
            onPress={() => handleDisconnect(device.id)}
          />
        </View>
      )}
    />
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Connected Devices</Text>
        <Button
          mode="outlined"
          onPress={() => {
            // Add scan functionality
          }}
        >
          Scan for Devices
        </Button>
      </View>

      <List.Section>
        {devices.length > 0 ? (
          devices.map(renderDeviceItem)
        ) : (
          <Text style={styles.noDevices}>No devices connected</Text>
        )}
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  deviceIcon: {
    marginRight: 8,
  },
  deviceActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginRight: 8,
  },
  noDevices: {
    textAlign: 'center',
    marginVertical: 16,
    fontStyle: 'italic',
  },
});

export default ConnectedDevicesScreen; 