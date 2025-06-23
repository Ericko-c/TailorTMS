import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import TaskForm from '../components/TaskForm';
import { API_BASE_URL } from '../config';
import Toast from 'react-native-toast-message';

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
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data.data || []))
      .catch(() => setTasks([]));
  }, []);

  const showToast = (type: 'success' | 'error', text1: string, text2?: string) => {
    Toast.show({ type, text1, text2 });
  };

  const addTask = async (task: Task) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to add task');
      setTasks([...tasks, data.data]);
      setShowForm(false);
      showToast('success', 'Task added successfully');
    } catch (err: any) {
      setError(err.message);
      showToast('error', 'Error', err.message);
    }
  };

  const updateTask = async (task: Task, index: number) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update task');
      const updated = [...tasks];
      updated[index] = data.data;
      setTasks(updated);
      setEditIndex(null);
      setEditTask(null);
      setShowForm(false);
      showToast('success', 'Task updated successfully');
    } catch (err: any) {
      setError(err.message);
      showToast('error', 'Error', err.message);
    }
  };

  const deleteTask = async (id: string, index: number) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to delete task');
      const updated = [...tasks];
      updated.splice(index, 1);
      setTasks(updated);
      showToast('success', 'Task deleted successfully');
    } catch (err: any) {
      setError(err.message);
      showToast('error', 'Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Toast />
      {error && (
        <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
      )}

      {showForm ? (
        <TaskForm onSubmit={editIndex !== null && editTask ? (t: Task) => updateTask({ ...editTask, ...t }, editIndex) : addTask} initialData={editTask} />
      ) : (
        <Button title="Assign Task" onPress={() => { setShowForm(true); setEditIndex(null); setEditTask(null); }} />
      )}

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>Task for Order ID: {item.orderId}</Text>
            <Text>Tailor: {item.tailorName}</Text>
            <Text>Description: {item.taskDescription}</Text>
            <Text>Status: {item.status}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Button title="Edit" onPress={() => { setEditIndex(index); setEditTask(item); setShowForm(true); }} />
              <View style={{ width: 10 }} />
              <Button title="Delete" color="#d32f2f" onPress={() => item._id && deleteTask(item._id, index)} />
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
