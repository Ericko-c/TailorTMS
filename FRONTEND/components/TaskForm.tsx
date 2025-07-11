import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Task {
  _id?: string;
  orderId: string;
  tailorName: string;
  taskDescription: string;
  status: string;
}

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  initialData?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData }) => {
  const [orderId, setOrderId] = useState(initialData?.orderId || '');
  const [tailorName, setTailorName] = useState(initialData?.tailorName || '');
  const [taskDescription, setTaskDescription] = useState(initialData?.taskDescription || '');
  const [status, setStatus] = useState(initialData?.status || 'Pending');

  useEffect(() => {
    if (initialData) {
      setOrderId(initialData.orderId || '');
      setTailorName(initialData.tailorName || '');
      setTaskDescription(initialData.taskDescription || '');
      setStatus(initialData.status || 'Pending');
    }
  }, [initialData]);

  const handleSubmit = () => {
    const taskData: Task = {
      orderId,
      tailorName,
      taskDescription,
      status,
      _id: initialData?._id,
    };
    onSubmit(taskData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{initialData ? 'Edit Task' : 'Assign Task'}</Text>

      <Text style={styles.label}>Order ID</Text>
      <TextInput
        style={styles.input}
        value={orderId}
        onChangeText={setOrderId}
        placeholder="Enter Order ID"
      />

      <Text style={styles.label}>Tailor Name</Text>
      <TextInput
        style={styles.input}
        value={tailorName}
        onChangeText={setTailorName}
        placeholder="Enter Tailor Name"
      />

      <Text style={styles.label}>Task Description</Text>
      <TextInput
        style={styles.input}
        value={taskDescription}
        onChangeText={setTaskDescription}
        placeholder="Enter Task Description"
      />

      <Text style={styles.label}>Status</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue: string) => setStatus(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Pending" value="Pending" />
        <Picker.Item label="In Progress" value="In Progress" />
        <Picker.Item label="Completed" value="Completed" />
      </Picker>

      <Button title={initialData ? 'Update' : 'Submit'} onPress={handleSubmit} />
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

export default TaskForm;
