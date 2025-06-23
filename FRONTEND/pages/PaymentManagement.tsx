import React, { useEffect, useState } from 'react';
import PaymentForm from '../components/PaymentForm';
import { API_BASE_URL } from '../config';
import Toast from 'react-native-toast-message';

interface Payment {
  _id?: string;
  orderId: string;
  amount: number;
  method: string;
  status: string;
}

const PaymentManagement: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editPayment, setEditPayment] = useState<Payment | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/payments`)
      .then(res => res.json())
      .then(data => setPayments(data.data || []))
      .catch(() => setPayments([]));
  }, []);

  const showToast = (type: 'success' | 'error', text1: string, text2?: string) => {
    Toast.show({ type, text1, text2 });
  };

  const addPayment = async (payment: Payment) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payment),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to add payment');
      setPayments([...payments, data.data]);
      showToast('success', 'Payment added successfully');
    } catch (err: any) {
      setError(err.message);
      showToast('error', 'Error', err.message);
    }
  };

  const updatePayment = async (payment: Payment, index: number) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/payments/${payment._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payment),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update payment');
      const updated = [...payments];
      updated[index] = data.data;
      setPayments(updated);
      setEditIndex(null);
      setEditPayment(null);
      showToast('success', 'Payment updated successfully');
    } catch (err: any) {
      setError(err.message);
      showToast('error', 'Error', err.message);
    }
  };

  const deletePayment = async (id: string, index: number) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/payments/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to delete payment');
      const updated = [...payments];
      updated.splice(index, 1);
      setPayments(updated);
      showToast('success', 'Payment deleted successfully');
    } catch (err: any) {
      setError(err.message);
      showToast('error', 'Error', err.message);
    }
  };

  return (
    <div>
      <Toast />
      {error && (
        <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>
      )}
      <h1>Payment Management</h1>
      <PaymentForm onSubmit={editIndex !== null && editPayment ? (p: Payment) => updatePayment({ ...editPayment, ...p }, editIndex) : addPayment} initialData={editPayment} />
      <table style={{ width: '100%', marginTop: 20 }}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((item, index) => (
            <tr key={item._id || index}>
              <td>{item.orderId}</td>
              <td>{item.amount}</td>
              <td>{item.method}</td>
              <td>{item.status}</td>
              <td>
                <button onClick={() => { setEditIndex(index); setEditPayment(item); }}>Edit</button>
                <button style={{ marginLeft: 8, color: 'red' }} onClick={() => item._id && deletePayment(item._id, index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentManagement;
