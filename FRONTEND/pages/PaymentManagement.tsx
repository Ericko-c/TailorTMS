import React from 'react';
import PaymentForm from '../components/PaymentForm';

const PaymentManagement: React.FC = () => {
    return (
        <div>
            <h1>Payment Management</h1>
            <PaymentForm />
            {/* Add table or list to display payment records */}
        </div>
    );
};

export default PaymentManagement;
