import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import OrderForm from '../components/OrderForm';
import Notification from '../components/Notification';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState('');

  const addOrder = (order) => {
    setOrders([...orders, order]);
    setShowForm(false);
  };

  const markOrderAsDone = (orderId) => {
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
