import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, Card, useTheme, SegmentedButtons, Chip } from 'react-native-paper';
import { useTractor } from '../context/TractorContext';

const HistoryScreen = () => {
  const { colors } = useTheme();
  const { tractorData, refreshData } = useTractor();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [history, setHistory] = useState([]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshData();
      updateHistory();
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
    setRefreshing(false);
  };

  const updateHistory = () => {
    // Simulate history data - replace with actual API call
    const newHistory = [
      {
        id: '1',
        type: 'operation',
        timestamp: new Date(),
        duration: '2h 30m',
        area: 'Field A',
        status: 'completed',
      },
      {
        id: '2',
        type: 'maintenance',
        timestamp: new Date(Date.now() - 86400000),
        description: 'Routine check',
        status: 'completed',
      },
      {
        id: '3',
        type: 'error',
        timestamp: new Date(Date.now() - 172800000),
        description: 'Motor overheating',
        status: 'resolved',
      },
    ];

    setHistory(newHistory);
  };

  useEffect(() => {
    updateHistory();
  }, [tractorData]);

  const filteredHistory = history.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.type === selectedFilter;
  });

  const renderHistoryItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.itemHeader}>
          <Text style={styles.timestamp}>
            {item.timestamp.toLocaleString()}
          </Text>
          <Chip
            style={[
              styles.statusChip,
              {
                backgroundColor:
                  item.status === 'completed' || item.status === 'resolved'
                    ? colors.success
                    : colors.error,
              },
            ]}
          >
            {item.status}
          </Chip>
        </View>
        <Text style={styles.type}>{item.type.toUpperCase()}</Text>
        {item.duration && (
          <Text style={styles.details}>Duration: {item.duration}</Text>
        )}
        {item.area && <Text style={styles.details}>Area: {item.area}</Text>}
        {item.description && (
          <Text style={styles.details}>{item.description}</Text>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SegmentedButtons
        value={selectedFilter}
        onValueChange={setSelectedFilter}
        buttons={[
          { value: 'all', label: 'All' },
          { value: 'operation', label: 'Operations' },
          { value: 'maintenance', label: 'Maintenance' },
          { value: 'error', label: 'Errors' },
        ]}
        style={styles.filter}
      />

      <FlatList
        data={filteredHistory}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filter: {
    margin: 16,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  statusChip: {
    height: 24,
  },
  type: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    marginBottom: 2,
  },
});

export default HistoryScreen; 