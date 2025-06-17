/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import PaymentManagement from './pages/PaymentManagement';

function App() {
  return (
    <Router>
      <View style={styles.container}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/payments" element={<PaymentManagement />} />
        </Routes>
        <ToastContainer />
      </View>
    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F7FF',
  },
});

export const notify = (message: string) => toast(message);

export default App;
