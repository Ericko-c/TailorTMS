const request = require('supertest');
const app = require('../app');

describe('Customer Controller', () => {
  it('should get all customers', async () => {
    const res = await request(app).get('/api/customers');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should create a new customer', async () => {
    const res = await request(app)
      .post('/api/customers')
      .send({ name: 'Test User', contact: '1234567890' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('name', 'Test User');
  });
});
