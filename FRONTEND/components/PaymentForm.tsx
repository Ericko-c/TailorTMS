import React, { useState, useEffect } from 'react';
import { notify } from '../App';

interface Payment {
  _id?: string;
  orderId: string;
  amount: number;
  method: string;
  status: string;
}

interface PaymentFormProps {
  onSubmit: (payment: Payment) => void;
  initialData?: Payment | null;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit, initialData }) => {
  const [paymentData, setPaymentData] = useState({
    orderId: initialData?.orderId || '',
    amount: initialData?.amount?.toString() || '',
    method: initialData?.method || '',
    status: initialData?.status || 'Unpaid',
  });

  useEffect(() => {
    if (initialData) {
      setPaymentData({
        orderId: initialData.orderId || '',
        amount: initialData.amount?.toString() || '',
        method: initialData.method || '',
        status: initialData.status || 'Unpaid',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = (e.target as HTMLInputElement).name || (e.target as HTMLSelectElement).name;
    const value = (e.target as HTMLInputElement).value || (e.target as HTMLSelectElement).value;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentData.orderId || !paymentData.amount || !paymentData.method) {
      notify('All fields are required!');
      return;
    }
    if (isNaN(Number(paymentData.amount)) || Number(paymentData.amount) <= 0) {
      notify('Amount must be a positive number!');
      return;
    }
    const payment: Payment = {
      orderId: paymentData.orderId,
      amount: Number(paymentData.amount),
      method: paymentData.method,
      status: paymentData.status,
      _id: initialData?._id,
    };
    onSubmit(payment);
    notify('Payment submitted successfully!');
  };

  const styles = {
    formContainer: {
      padding: '20px',
      backgroundColor: '#e0f7fa', // Light blue-green background
      borderRadius: '10px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      margin: '20px auto',
      maxWidth: '500px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontSize: '16px',
      color: '#00796b', // Dark teal for labels
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #004d40', // Dark green border
      borderRadius: '5px',
      backgroundColor: '#ffffff', // White background for input fields
    },
    errorInput: {
      borderColor: '#d32f2f', // Red for invalid fields
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#00796b', // Teal for buttons
      color: '#ffffff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#004d40', // Dark green for hover effect
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <div>
        <label style={styles.label}>Order ID:</label>
        <input
          type="text"
          name="orderId"
          value={paymentData.orderId}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>
      <div>
        <label style={styles.label}>Amount:</label>
        <input
          type="number"
          name="amount"
          value={paymentData.amount}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>
      <div>
        <label style={styles.label}>Payment Method:</label>
        <select name="method" value={paymentData.method} onChange={handleChange} required style={styles.input}>
          <option value="">Select Method</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Online">Online</option>
        </select>
      </div>
      <div>
        <label style={styles.label}>Status:</label>
        <select name="status" value={paymentData.status} onChange={handleChange} required style={styles.input}>
          <option value="Unpaid">Unpaid</option>
          <option value="Paid">Paid</option>
        </select>
      </div>
      <button type="submit" style={styles.button}>
        {initialData ? 'Update Payment' : 'Submit Payment'}
      </button>
    </form>
  );
};

export default PaymentForm;
