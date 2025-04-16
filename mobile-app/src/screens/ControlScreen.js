import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Joystick from 'react-native-joystick';
import { io } from 'socket.io-client';

const ControlScreen = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleJoystickMove = (data) => {
    if (socket && isConnected) {
      socket.emit('control', {
        type: 'movement',
        x: data.x,
        y: data.y
      });
    }
  };

  const handleAction = (action) => {
    if (socket && isConnected) {
      socket.emit('control', {
        type: 'action',
        action: action
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tractor Control</Text>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Connection: {isConnected ? 'Connected' : 'Disconnected'}
        </Text>
      </View>

      <View style={styles.controlContainer}>
        <Joystick
          style={styles.joystick}
          onMove={handleJoystickMove}
          onStop={() => handleJoystickMove({ x: 0, y: 0 })}
        />
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleAction('start_cutting')}
        >
          <Text style={styles.actionButtonText}>Start Cutting</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleAction('stop_cutting')}
        >
          <Text style={styles.actionButtonText}>Stop Cutting</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleAction('load_trailer')}
        >
          <Text style={styles.actionButtonText}>Load Trailer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleAction('unload_trailer')}
        >
          <Text style={styles.actionButtonText}>Unload Trailer</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  statusContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    color: '#666',
  },
  controlContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joystick: {
    width: 200,
    height: 200,
  },
  actionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ControlScreen; 