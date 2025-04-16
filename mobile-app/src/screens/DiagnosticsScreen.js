import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, ProgressBar, useTheme, Button } from 'react-native-paper';
import { useTractor } from '../context/TractorContext';

const DiagnosticsScreen = () => {
  const { colors } = useTheme();
  const { tractorData, refreshData } = useTractor();
  const [refreshing, setRefreshing] = useState(false);
  const [diagnostics, setDiagnostics] = useState({
    systemStatus: 'Normal',
    errors: [],
    warnings: [],
    lastUpdate: new Date(),
  });

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshData();
      updateDiagnostics();
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
    setRefreshing(false);
  };

  const updateDiagnostics = () => {
    const newDiagnostics = {
      systemStatus: 'Normal',
      errors: [],
      warnings: [],
      lastUpdate: new Date(),
    };

    // Check battery status
    if (tractorData.battery < 20) {
      newDiagnostics.warnings.push('Low battery level');
    }

    // Check temperature
    if (tractorData.temperature > 80) {
      newDiagnostics.warnings.push('High temperature detected');
    }

    // Check motor status
    if (tractorData.motorStatus !== 'normal') {
      newDiagnostics.errors.push(`Motor issue: ${tractorData.motorStatus}`);
    }

    // Check sensor status
    if (tractorData.sensorStatus !== 'normal') {
      newDiagnostics.errors.push(`Sensor issue: ${tractorData.sensorStatus}`);
    }

    // Update system status
    if (newDiagnostics.errors.length > 0) {
      newDiagnostics.systemStatus = 'Error';
    } else if (newDiagnostics.warnings.length > 0) {
      newDiagnostics.systemStatus = 'Warning';
    }

    setDiagnostics(newDiagnostics);
  };

  useEffect(() => {
    updateDiagnostics();
  }, [tractorData]);

  const renderStatusCard = (title, value, color) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={[styles.cardValue, { color }]}>{value}</Text>
      </Card.Content>
    </Card>
  );

  const renderProgressCard = (title, value, color) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>{title}</Text>
        <ProgressBar
          progress={value / 100}
          color={color}
          style={styles.progressBar}
        />
        <Text style={styles.progressText}>{value}%</Text>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Status</Text>
        {renderStatusCard(
          'Overall Status',
          diagnostics.systemStatus,
          diagnostics.systemStatus === 'Normal'
            ? colors.success
            : diagnostics.systemStatus === 'Warning'
            ? colors.warning
            : colors.error
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Health</Text>
        {renderProgressCard('Battery Level', tractorData.battery, colors.primary)}
        {renderProgressCard('CPU Usage', tractorData.cpuUsage, colors.primary)}
        {renderProgressCard('Memory Usage', tractorData.memoryUsage, colors.primary)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Warnings</Text>
        {diagnostics.warnings.length > 0 ? (
          diagnostics.warnings.map((warning, index) => (
            <Card key={index} style={[styles.card, { backgroundColor: colors.warningContainer }]}>
              <Card.Content>
                <Text style={{ color: colors.warning }}>{warning}</Text>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text style={styles.noIssues}>No warnings</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Errors</Text>
        {diagnostics.errors.length > 0 ? (
          diagnostics.errors.map((error, index) => (
            <Card key={index} style={[styles.card, { backgroundColor: colors.errorContainer }]}>
              <Card.Content>
                <Text style={{ color: colors.error }}>{error}</Text>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text style={styles.noIssues}>No errors</Text>
        )}
      </View>

      <View style={styles.section}>
        <Button
          mode="contained"
          onPress={() => {
            // Add functionality to export diagnostics
          }}
          style={styles.exportButton}
        >
          Export Diagnostics
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginVertical: 8,
  },
  progressText: {
    textAlign: 'right',
  },
  noIssues: {
    textAlign: 'center',
    marginVertical: 8,
    fontStyle: 'italic',
  },
  exportButton: {
    marginTop: 16,
  },
});

export default DiagnosticsScreen; 