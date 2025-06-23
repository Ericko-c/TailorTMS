import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { notify } from '../App';

interface Order {
  _id?: string;
  customerId: string;
  status: string;
  priority: string;
  assignedTailor: string;
}

interface OrderFormProps {
  onSubmit: (order: Order) => void;
  initialData?: Order | null;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, initialData }) => {
  const [customerId, setCustomerId] = useState(initialData?.customerId || '');
  const [status, setStatus] = useState(initialData?.status || 'New');
  const [priority, setPriority] = useState(initialData?.priority || 'Normal');
  const [assignedTailor, setAssignedTailor] = useState(initialData?.assignedTailor || '');

  useEffect(() => {
    if (initialData) {
      setCustomerId(initialData.customerId || '');
      setStatus(initialData.status || 'New');
      setPriority(initialData.priority || 'Normal');
      setAssignedTailor(initialData.assignedTailor || '');
    }
  }, [initialData]);

  const handleSubmit = () => {
    // Enhanced validation logic
    if (!customerId.trim()) {
      notify('Customer ID is required and cannot be empty!');
      return;
    }

    if (!assignedTailor.trim()) {
      notify('Assigned Tailor is required and cannot be empty!');
      return;
    }

    if (!['Normal', 'Urgent'].includes(priority)) {
      notify('Invalid priority selected! Please choose either Normal or Urgent.');
      return;
    }

    const orderData: Order = {
      customerId,
      status,
      priority,
      assignedTailor,
      _id: initialData?._id,
    };

    onSubmit(orderData);
    notify('Order submitted successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{initialData ? 'Edit Order' : 'Create Order'}</Text>

      <Text style={styles.label}>Customer ID</Text>
      <TextInput
        style={styles.input}
        value={customerId}
        onChangeText={setCustomerId}
        placeholder="Enter Customer ID"
      />

      <Text style={styles.label}>Status</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue: string) => setStatus(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="New" value="New" />
        <Picker.Item label="Cutting" value="Cutting" />
        <Picker.Item label="Sewing" value="Sewing" />
        <Picker.Item label="Final Touches" value="Final Touches" />
        <Picker.Item label="Done" value="Done" />
      </Picker>

      <Text style={styles.label}>Priority</Text>
      <Picker
        selectedValue={priority}
        onValueChange={(itemValue: string) => setPriority(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Normal" value="Normal" />
        <Picker.Item label="Urgent" value="Urgent" />
      </Picker>

      <Text style={styles.label}>Assigned Tailor</Text>
      <TextInput
        style={styles.input}
        value={assignedTailor}
        onChangeText={setAssignedTailor}
        placeholder="Enter Tailor Name"
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e0f7fa', // Light blue-green background
    borderRadius: 10, // Rounded corners for the container
    shadowColor: '#000', // Added shadow for better visual appeal
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Shadow for Android
  },
  title: {
    fontSize: 22, // Slightly larger font size for better readability
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
    borderColor: '#004d40', // Dark green border
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff', // White background for input fields
  },
  errorInput: {
    borderColor: '#d32f2f', // Red border for invalid fields
  },
});

export default OrderForm;
