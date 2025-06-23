import React, { useEffect, useState } from 'react';
import PaymentForm from '../components/PaymentForm';
import { API_BASE_URL } from '../config';

interface Payment {
  _id?: string;
  orderId: string;
  amount: number;
  method: string;
  status: string;
}

const PaymentManagement: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/payments`)
      .then(res => res.json())
      .then(data => setPayments(data))
      .catch(() => setPayments([]));
  }, []);

  return (
    <div>
      <h1>Payment Management</h1>
      <PaymentForm />
      {/* Add table or list to display payment records */}
    </div>
  );
};

export default PaymentManagement;
