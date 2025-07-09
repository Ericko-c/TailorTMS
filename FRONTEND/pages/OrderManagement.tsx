import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import OrderForm from '../components/OrderForm';
import Notification from '../components/Notification';
import { API_BASE_URL } from '../config';
import Toast from 'react-native-toast-message';

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
  const [error, setError] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editOrder, setEditOrder] = useState<Order | null>(null);

  // Fetch orders from backend on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/orders`)
      .then(res => res.json())
      .then(data => setOrders(data.data || []))
      .catch(() => setOrders([]));
  }, []);

  const showToast = (type: 'success' | 'error', text1: string, text2?: string) => {
    Toast.show({ type, text1, text2 });
  };

  const addOrder = async (order: Order) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to add order');
      setOrders([...orders, data.data]);
      setShowForm(false);
      showToast('success', 'Order added successfully');
    } catch (err: any) {
      setError(err.message);
      showToast('error', 'Error', err.message);
    }
  };

  const updateOrder = async (order: Order, index: number) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${order._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update order');
      const updated = [...orders];
      updated[index] = data.data;
      setOrders(updated);
      setEditIndex(null);
      setEditOrder(null);
      setShowForm(false);
      showToast('success', 'Order updated successfully');
    } catch (err: any) {
      setError(err.message);
      showToast('error', 'Error', err.message);
    }
  };

  const deleteOrder = async (id: string, index: number) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to delete order');
      const updated = [...orders];
      updated.splice(index, 1);
      setOrders(updated);
      showToast('success', 'Order deleted successfully');
    } catch (err: any) {
      setError(err.message);
      showToast('error', 'Error', err.message);
    }
  };

  const markOrderAsDone = (orderId: string) => {
    setNotification(`Order ${orderId} marked as Done!`);
  };

  return (
    <View style={styles.container}>
      <Toast />
      {error && (
        <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
      )}
      {notification && <Notification message={notification} />}
      <Text style={styles.title}>Order Management</Text>

      {showForm ? (
        <OrderForm onSubmit={editIndex !== null && editOrder ? (o) => updateOrder({ ...editOrder, ...o }, editIndex) : addOrder} initialData={editOrder} />
      ) : (
        <Button title="Create Order" onPress={() => { setShowForm(true); setEditIndex(null); setEditOrder(null); }} />
      )}

      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderTitle}>Order for Customer ID: {item.customerId}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Priority: {item.priority}</Text>
            <Text>Assigned Tailor: {item.assignedTailor}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Button title="Edit" onPress={() => { setEditIndex(index); setEditOrder(item); setShowForm(true); }} />
              <View style={{ width: 10 }} />
              <Button title="Delete" color="#d32f2f" onPress={() => item._id && deleteOrder(item._id, index)} />
              <View style={{ width: 10 }} />
              <Button title="Mark as Done" onPress={() => markOrderAsDone(item.customerId)} />
            </View>
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
