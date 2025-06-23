import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import OrderForm from '../components/OrderForm';
import Notification from '../components/Notification';
import { API_BASE_URL } from '../config';

interface Order {
  _id?: string;
  customerId: string;
  status: string;
  priority: string;
  assignedTailor: string;
}

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState('');

  // Fetch orders from backend on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/orders`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(() => setOrders([]));
  }, []);

  const addOrder = async (order: Order) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      const data = await response.json();
      setOrders([...orders, data]);
      setShowForm(false);
    } catch {
      // handle error
    }
  };

  const markOrderAsDone = (orderId: string) => {
    // Simulate marking an order as done and sending a notification
    setNotification(`Order ${orderId} marked as Done!`);
  };

  return (
    <View style={styles.container}>
      {notification && <Notification message={notification} />}
      <Text style={styles.title}>Order Management</Text>

      {showForm ? (
        <OrderForm onSubmit={addOrder} />
      ) : (
        <Button title="Create Order" onPress={() => setShowForm(true)} />
      )}

      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderTitle}>Order for Customer ID: {item.customerId}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Priority: {item.priority}</Text>
            <Text>Assigned Tailor: {item.assignedTailor}</Text>
            <Button title="Mark as Done" onPress={() => markOrderAsDone(item.customerId)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E6F7FF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderManagement;
