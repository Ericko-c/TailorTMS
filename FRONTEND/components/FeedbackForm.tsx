import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { API_BASE_URL } from '../config';

interface Feedback {
  _id?: string;
  orderId: string;
  tailorName: string;
  rating: number;
  comment: string;
}

interface FeedbackFormProps {
  onSubmit: (feedback: Feedback) => void;
  initialData?: Feedback | null;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, initialData }) => {
  const [orderId, setOrderId] = useState(initialData?.orderId || '');
  const [tailorName, setTailorName] = useState(initialData?.tailorName || '');
  const [rating, setRating] = useState(initialData?.rating?.toString() || '');
  const [comment, setComment] = useState(initialData?.comment || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setOrderId(initialData.orderId || '');
      setTailorName(initialData.tailorName || '');
      setRating(initialData.rating?.toString() || '');
      setComment(initialData.comment || '');
    }
  }, [initialData]);

  const handleSubmit = () => {
    const feedbackData: Feedback = {
      orderId,
      tailorName,
      rating: parseInt(rating, 10),
      comment,
      _id: initialData?._id,
    };
    onSubmit(feedbackData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{initialData ? 'Edit Feedback' : 'Submit Feedback'}</Text>
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
      <Button title={initialData ? 'Update' : 'Submit'} onPress={handleSubmit} disabled={loading} />
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
