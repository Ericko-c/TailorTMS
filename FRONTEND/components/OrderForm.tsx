import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import { notify } from '../App';

const OrderForm = ({ onSubmit }) => {
  const [customerId, setCustomerId] = useState('');
  const [status, setStatus] = useState('New');
  const [priority, setPriority] = useState('Normal');
  const [assignedTailor, setAssignedTailor] = useState('');

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

    const orderData = {
      customerId,
      status,
      priority,
      assignedTailor,
    };

    onSubmit(orderData);
    notify('Order submitted successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Order</Text>

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
        onValueChange={(itemValue) => setStatus(itemValue)}
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
        onValueChange={(itemValue) => setPriority(itemValue)}
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
