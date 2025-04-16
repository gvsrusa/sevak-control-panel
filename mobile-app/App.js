import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { TractorProvider } from './src/context/TractorContext';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import ControlScreen from './src/screens/ControlScreen';
import TelemetryScreen from './src/screens/TelemetryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TractorProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#4CAF50',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ title: 'Sevak Control Panel' }}
            />
            <Stack.Screen 
              name="Control" 
              component={ControlScreen}
              options={{ title: 'Tractor Control' }}
            />
            <Stack.Screen 
              name="Telemetry" 
              component={TelemetryScreen}
              options={{ title: 'Tractor Status' }}
            />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </TractorProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
}); 