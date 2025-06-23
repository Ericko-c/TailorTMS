import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';
import { API_BASE_URL } from '../config';

interface LoginCredentials {
  username: string;
  password: string;
}

const LoginPage = () => {
  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        // Save token and navigate to the dashboard
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <LoginForm onLogin={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6F7FF',
  },
});

export default LoginPage;
