import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import FeedbackForm from '../components/FeedbackForm';
import { API_BASE_URL } from '../config';
import Toast from 'react-native-toast-message';

interface Feedback {
  _id?: string;
  orderId: string;
  tailorName: string;
  rating: number;
  comment: string;
}

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editFeedback, setEditFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/feedback`)
      .then(res => res.json())
      .then(data => setFeedbacks(data.data || []))
      .catch(() => setFeedbacks([]));
  }, []);

  const showToast = (type: 'success' | 'error', text1: string, text2?: string) => {
    Toast.show({ type, text1, text2 });
  };

  const addFeedback = async (feedback: Feedback) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to add feedback');
      setFeedbacks([...feedbacks, data.data]);
      setShowForm(false);
      showToast('success', 'Feedback added successfully');
    } catch (err: any) {
      setError(err.message);
      showToast('error', 'Error', err.message);
    }
  };

  const updateFeedback = async (feedback: Feedback, index: number) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/feedback/${feedback._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update feedback');
      const updated = [...feedbacks];
      updated[index] = data.data;
      setFeedbacks(updated);
      setEditIndex(null);
      setEditFeedback(null);
      setShowForm(false);
      showToast('success', 'Feedback updated successfully');
    } catch (err: any) {
      setError(err.message);
      showToast('error', 'Error', err.message);
    }
  };

  const deleteFeedback = async (id: string, index: number) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/feedback/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to delete feedback');
      const updated = [...feedbacks];
      updated.splice(index, 1);
      setFeedbacks(updated);
      showToast('success', 'Feedback deleted successfully');
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

      <Text style={styles.title}>Feedback Management</Text>

      {showForm ? (
        <FeedbackForm onSubmit={editIndex !== null && editFeedback ? (f: Feedback) => updateFeedback({ ...editFeedback, ...f }, editIndex) : addFeedback} initialData={editFeedback} />
      ) : (
        <Button title="Add Feedback" onPress={() => { setShowForm(true); setEditIndex(null); setEditFeedback(null); }} />
      )}

      <FlatList
        data={feedbacks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.feedbackItem}>
            <Text style={styles.feedbackRating}>Rating: {item.rating}</Text>
            <Text>Comment: {item.comment}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Button title="Edit" onPress={() => { setEditIndex(index); setEditFeedback(item); setShowForm(true); }} />
              <View style={{ width: 10 }} />
              <Button title="Delete" color="#d32f2f" onPress={() => item._id && deleteFeedback(item._id, index)} />
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
  feedbackItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  feedbackRating: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FeedbackManagement;
