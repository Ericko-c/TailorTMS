const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

let connection;

beforeAll(async () => {
    connection = await mongoose.connect('mongodb://localhost:27017/tailorTMS_test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await connection.disconnect();
});

describe('Payment API', () => {
    it('should create a payment', async () => {
        const response = await request(app)
            .post('/api/payments')
            .send({
                customerId: '12345',
                amount: 100,
                method: 'Cash',
                status: 'Paid',
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
    });

    it('should retrieve all payments', async () => {
        const response = await request(app).get('/api/payments');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should retrieve a payment by ID', async () => {
        const payment = await request(app)
            .post('/api/payments')
            .send({
                customerId: '12345',
                amount: 100,
                method: 'Cash',
                status: 'Paid',
            });

        const response = await request(app).get(`/api/payments/${payment.body._id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', payment.body._id);
    });

    it('should update a payment', async () => {
        const payment = await request(app)
            .post('/api/payments')
            .send({
                customerId: '12345',
                amount: 100,
                method: 'Cash',
                status: 'Paid',
            });

        const response = await request(app)
            .put(`/api/payments/${payment.body._id}`)
            .send({
                amount: 150,
                method: 'Card',
                status: 'Paid',
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('amount', 150);
    });

    it('should delete a payment', async () => {
        const payment = await request(app)
            .post('/api/payments')
            .send({
                customerId: '12345',
                amount: 100,
                method: 'Cash',
                status: 'Paid',
            });

        const response = await request(app).delete(`/api/payments/${payment.body._id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Payment deleted successfully');
    });
});
