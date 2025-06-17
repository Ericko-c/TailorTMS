import React, { useState } from 'react';
import { notify } from '../App';

const PaymentForm: React.FC = () => {
    const [paymentData, setPaymentData] = useState({
        customerId: '',
        amount: '',
        method: '',
        status: 'Unpaid',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPaymentData({ ...paymentData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!paymentData.customerId || !paymentData.amount || !paymentData.method) {
            notify('All fields are required!');
            return;
        }

        if (isNaN(Number(paymentData.amount)) || Number(paymentData.amount) <= 0) {
            notify('Amount must be a positive number!');
            return;
        }

        console.log(paymentData);
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
                <label style={styles.label}>Customer ID:</label>
                <input
                    type="text"
                    name="customerId"
                    value={paymentData.customerId}
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
                Submit Payment
            </button>
        </form>
    );
};

export default PaymentForm;
