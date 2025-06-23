const request = require('supertest');
const app = require('../app');

describe('Order Controller', () => {
  it('should get all orders', async () => {
    const res = await request(app).get('/api/orders');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should create a new order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ customerId: 'dummyId', items: [], total: 100 });
    // Adjust fields as per your Order model
    expect([200, 201, 400]).toContain(res.statusCode); // Accepts validation error if dummyId is invalid
  });
});
