import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { io } from 'socket.io-client';

const TelemetryScreen = () => {
  const [telemetry, setTelemetry] = useState({
    battery: 0,
    speed: 0,
    location: { lat: 0, lng: 0 },
    cuttingStatus: 'idle',
    trailerStatus: 'empty',
    motorTemperature: 0,
    errorStatus: null
  });

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('tractor-telemetry', (data) => {
      setTelemetry(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tractor Telemetry</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Power Status</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Battery Level:</Text>
          <Text style={styles.value}>{telemetry.battery}%</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Motor Temperature:</Text>
          <Text style={styles.value}>{telemetry.motorTemperature}°C</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Movement Status</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Current Speed:</Text>
          <Text style={styles.value}>{telemetry.speed} km/h</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>
            {telemetry.location.lat}, {telemetry.location.lng}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Operation Status</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Cutting Status:</Text>
          <Text style={styles.value}>{telemetry.cuttingStatus}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Trailer Status:</Text>
          <Text style={styles.value}>{telemetry.trailerStatus}</Text>
        </View>
      </View>

      {telemetry.errorStatus && (
        <View style={[styles.card, styles.errorCard]}>
          <Text style={styles.cardTitle}>Error Status</Text>
          <Text style={styles.errorText}>{telemetry.errorStatus}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  errorCard: {
    backgroundColor: '#ffebee',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
  },
});

export default TelemetryScreen; 