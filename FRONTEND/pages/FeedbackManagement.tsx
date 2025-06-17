import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import FeedbackForm from '../components/FeedbackForm';

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addFeedback = (feedback) => {
    setFeedbacks([...feedbacks, feedback]);
    setShowForm(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback Management</Text>

      {showForm ? (
        <FeedbackForm onSubmit={addFeedback} />
      ) : (
        <Button title="Add Feedback" onPress={() => setShowForm(true)} />
      )}

      <FlatList
        data={feedbacks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.feedbackItem}>
            <Text style={styles.feedbackRating}>Rating: {item.rating}</Text>
            <Text>Comment: {item.comment}</Text>
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
