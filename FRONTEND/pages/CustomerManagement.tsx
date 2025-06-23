import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import CustomerForm from '../components/CustomerForm';
import MeasurementForm from '../components/MeasurementForm';
import { API_BASE_URL } from '../config';

interface Customer {
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

  // Fetch customers from backend on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/customers`)
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(() => setCustomers([]));
  }, []);

  const addCustomer = async (customer: Customer) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      const data = await response.json();
      setCustomers([...customers, data]);
      setShowForm(false);
    } catch {
      // handle error
    }
  };

  const addMeasurement = (measurement: Measurement) => {
    setMeasurements([...measurements, measurement]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Management</Text>

      {showForm ? (
        <CustomerForm onSubmit={addCustomer} />
      ) : (
        <Button title="Add Customer" onPress={() => setShowForm(true)} />
      )}

      <FlatList
        data={customers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.customerItem}>
            <Text style={styles.customerName}>{item.name}</Text>
            <Text>Contact: {item.contact}</Text>
            <Text>Measurements:</Text>
            <Text>Chest: {item.measurements.chest}</Text>
            <Text>Waist: {item.measurements.waist}</Text>
            <Text>Hips: {item.measurements.hips}</Text>
            <Text>Sleeve: {item.measurements.sleeve}</Text>
            <Text>Inseam: {item.measurements.inseam}</Text>
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
