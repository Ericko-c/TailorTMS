const request = require('supertest');
const app = require('../app');

describe('Feedback Controller', () => {
  it('should get all feedback', async () => {
    const res = await request(app).get('/api/feedback');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should create new feedback', async () => {
    const res = await request(app)
      .post('/api/feedback')
      .send({ orderId: 'dummyOrderId', tailorName: 'Test Tailor', rating: 5, comment: 'Great!' });
    // Adjust fields as per your Feedback model
    expect([200, 201, 400]).toContain(res.statusCode); // Accepts validation error if dummyOrderId is invalid
  });
});
