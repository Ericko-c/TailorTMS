import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import TaskForm from '../components/TaskForm';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setShowForm(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Management</Text>

      {showForm ? (
        <TaskForm onSubmit={addTask} />
      ) : (
        <Button title="Assign Task" onPress={() => setShowForm(true)} />
      )}

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>Task for Order ID: {item.orderId}</Text>
            <Text>Tailor: {item.tailorName}</Text>
            <Text>Description: {item.taskDescription}</Text>
            <Text>Status: {item.status}</Text>
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
  taskItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TaskManagement;
