import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface Measurement {
  chest: number;
  waist: number;
  hips: number;
  sleeve: number;
  inseam: number;
}

type MeasurementFormProps = {
  onSubmit: (measurements: Measurement) => void;
};

const MeasurementForm = ({ onSubmit }: MeasurementFormProps) => {
  const [measurements, setMeasurements] = useState<{ [key: string]: string; chest: string; waist: string; hips: string; sleeve: string; inseam: string }>({
    chest: '',
    waist: '',
    hips: '',
    sleeve: '',
    inseam: '',
  });

  const handleSubmit = () => {
    const measurementData: Measurement = {
      chest: parseFloat(measurements.chest),
      waist: parseFloat(measurements.waist),
      hips: parseFloat(measurements.hips),
      sleeve: parseFloat(measurements.sleeve),
      inseam: parseFloat(measurements.inseam),
    };
    onSubmit(measurementData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Measurements</Text>
      {Object.keys(measurements).map((key) => (
        <View key={key}>
          <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
          <TextInput
            style={styles.input}
            value={measurements[key]}
            onChangeText={(text) => setMeasurements({ ...measurements, [key]: text })}
            keyboardType="numeric"
          />
        </View>
      ))}
      <Button title="Add Measurement" onPress={handleSubmit} />
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

export default MeasurementForm;
