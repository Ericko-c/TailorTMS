import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import CustomerForm from '../components/CustomerForm';
import MeasurementForm from '../components/MeasurementForm';
import { API_BASE_URL } from '../config';
import Toast from 'react-native-toast-message';

interface Customer {
  _id?: string;
  name: string;
  contact: string;
  measurements: {
    chest: number;
    waist: number;
    hips: number;
    sleeve: number;
    inseam: number;
  };
}

interface Measurement {
  chest: number;
  waist: number;
  hips: number;
  sleeve: number;
  inseam: number;
}

const CustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch customers from backend on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/customers`)
      .then(res => res.json())
      .then(data => setCustomers(data.data || []))
      .catch(() => setCustomers([]));
  }, []);

  const showToast = (type: 'success' | 'error', text1: string, text2?: string) => {
    Toast.show({ type, text1, text2 });
  };

  const addCustomer = async (customer: Customer) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to add customer');
      setCustomers([...customers, data.data]);
      setShowForm(false);
      showToast('success', 'Customer added successfully');
    } catch (err: any) {
      setError(err.message);
      showToast('error', 'Error', err.message);
    }
  };

  const updateCustomer = async (customer: Customer, index: number) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${customer._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update customer');
      const updated = [...customers];
      updated[index] = data.data;
      setCustomers(updated);
      setEditIndex(null);
      setEditCustomer(null);
      setShowForm(false);
      showToast('success', 'Customer updated successfully');
    } catch (err: any) {
      setError(err.message);
      showToast('error', 'Error', err.message);
    }
  };

  const deleteCustomer = async (id: string, index: number) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to delete customer');
      const updated = [...customers];
      updated.splice(index, 1);
      setCustomers(updated);
      showToast('success', 'Customer deleted successfully');
    } catch (err: any) {
      setError(err.message);
      showToast('error', 'Error', err.message);
    }
  };

  const addMeasurement = (measurement: Measurement) => {
    setMeasurements([...measurements, measurement]);
  };

  const handleAddCustomer = (customer: Customer) => {
    if (editIndex !== null && editCustomer) {
      updateCustomer({ ...editCustomer, ...customer }, editIndex);
    } else {
      addCustomer(customer);
    }
  };

  return (
    <View style={styles.container}>
      <Toast />
      {error && (
        <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
      )}
      <Text style={styles.title}>Customer Management</Text>
      {showForm ? (
        <CustomerForm onSubmit={editIndex !== null && editCustomer ? (c) => updateCustomer({ ...editCustomer, ...c }, editIndex) : addCustomer} initialData={editCustomer} />
      ) : (
        <Button title="Add Customer" onPress={() => { setShowForm(true); setEditIndex(null); setEditCustomer(null); }} />
      )}
      <FlatList
        data={customers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.customerItem}>
            <Text style={styles.customerName}>{item.name}</Text>
            <Text>Contact: {item.contact}</Text>
            <Text>Measurements:</Text>
            <Text>Chest: {item.measurements.chest}</Text>
            <Text>Waist: {item.measurements.waist}</Text>
            <Text>Hips: {item.measurements.hips}</Text>
            <Text>Sleeve: {item.measurements.sleeve}</Text>
            <Text>Inseam: {item.measurements.inseam}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Button title="Edit" onPress={() => { setEditIndex(index); setEditCustomer(item); setShowForm(true); }} />
              <View style={{ width: 10 }} />
              <Button title="Delete" color="#d32f2f" onPress={() => item._id && deleteCustomer(item._id, index)} />
            </View>
          </View>
        )}
      />
      <MeasurementForm onSubmit={addMeasurement} />
      <FlatList
        data={measurements}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.measurementItem}>
            <Text>Chest: {item.chest}</Text>
            <Text>Waist: {item.waist}</Text>
            <Text>Hips: {item.hips}</Text>
            <Text>Sleeve: {item.sleeve}</Text>
            <Text>Inseam: {item.inseam}</Text>
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
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: '#004d40', // Dark green for labels
  },
  input: {
    borderWidth: 1,
    borderColor: '#004d40',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  errorInput: {
    borderColor: '#d32f2f',
  },
  customerItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  measurementItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default CustomerManagement;
