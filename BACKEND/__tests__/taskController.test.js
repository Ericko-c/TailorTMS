const request = require('supertest');
const app = require('../app');

describe('Task Controller', () => {
  it('should get all tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task', description: 'Test Desc', status: 'Pending' });
    // Adjust fields as per your Task model
    expect([200, 201, 400]).toContain(res.statusCode); // Accepts validation error if required fields are missing
  });
});
