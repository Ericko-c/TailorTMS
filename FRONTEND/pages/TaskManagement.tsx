import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import TaskForm from '../components/TaskForm';
import { API_BASE_URL } from '../config';

interface Task {
  _id?: string;
  orderId: string;
  tailorName: string;
  taskDescription: string;
  status: string;
}

const TaskManagement = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(() => setTasks([]));
  }, []);

  const addTask = async (task: Task) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      setTasks([...tasks, data]);
      setShowForm(false);
    } catch {
      // handle error
    }
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
