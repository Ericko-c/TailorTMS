import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { API_BASE_URL } from '../config';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/analytics`)
      .then((res) => res.json())
      .then((data) => setAnalytics(data))
      .catch((err) => console.error('Error fetching analytics:', err));
  }, []);

  if (!analytics) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading analytics...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics Dashboard</Text>

      <Text style={styles.sectionTitle}>Order Metrics</Text>
      <Text style={styles.label}>Total Orders: {analytics.totalOrders}</Text>
      <Text style={styles.label}>Active Orders: {analytics.activeOrders}</Text>
      <Text style={styles.label}>Completed Orders: {analytics.completedOrders}</Text>

      <Text style={styles.sectionTitle}>Tailor Performance</Text>
      <FlatList
        data={analytics.tailorPerformance}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Tailor: {item._id}</Text>
            <Text>Average Rating: {item.averageRating.toFixed(2)}</Text>
            <Text>Feedback Count: {item.feedbackCount}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Weekly Trends</Text>
      <FlatList
        data={analytics.weeklyTrends}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Week: {item._id}</Text>
            <Text>Order Count: {item.orderCount}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Customer Return Rate</Text>
      <FlatList
        data={analytics.customerReturnRate}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Return Rate: {item.returnRate}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e0f7fa', // Light blue-green background
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796b', // Teal for titles
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#004d40', // Dark green for section titles
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: '#004d40', // Dark green for labels
  },
  item: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#004d40',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AnalyticsDashboard;
