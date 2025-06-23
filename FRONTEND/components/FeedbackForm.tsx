import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { API_BASE_URL } from '../config';

interface FeedbackFormProps {
  onSubmit: (feedback: any) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const feedbackData = {
        rating: parseInt(rating, 10),
        comment,
      };
      // Send feedback to backend
      const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      });
      const data = await response.json();
      onSubmit(data);
    } catch (error) {
      Alert.alert('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Feedback</Text>

      <Text style={styles.label}>Rating (1-5)</Text>
      <TextInput
        style={styles.input}
        value={rating}
        onChangeText={setRating}
        placeholder="Enter rating"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Comment</Text>
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={setComment}
        placeholder="Enter comment"
      />

      <Button title="Submit" onPress={handleSubmit} disabled={loading} />
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

export default FeedbackForm;
