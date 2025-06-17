import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CustomerForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    hips: '',
    sleeve: '',
    inseam: '',
  });

  const handleSubmit = () => {
    const customerData = {
      name,
      contact,
      measurements: {
        chest: parseFloat(measurements.chest),
        waist: parseFloat(measurements.waist),
        hips: parseFloat(measurements.hips),
        sleeve: parseFloat(measurements.sleeve),
        inseam: parseFloat(measurements.inseam),
      },
    };
    onSubmit(customerData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />

      <Text style={styles.label}>Contact</Text>
      <TextInput
        style={styles.input}
        value={contact}
        onChangeText={setContact}
        placeholder="Enter contact"
      />

      <Text style={styles.label}>Measurements</Text>
      {Object.keys(measurements).map((key) => (
        <View key={key}>
          <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
          <TextInput
            style={styles.input}
            value={measurements[key]}
            onChangeText={(value) => setMeasurements({ ...measurements, [key]: value })}
            placeholder={`Enter ${key}`}
            keyboardType="numeric"
          />
        </View>
      ))}

      <Button title="Submit" onPress={handleSubmit} />
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
});

export default CustomerForm;
