const request = require('supertest');
const app = require('../app'); // Adjust if your Express app is exported elsewhere

describe('Analytics Controller', () => {
  it('should return analytics data with correct structure', async () => {
    const res = await request(app).get('/api/analytics');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('totalOrders');
    expect(res.body).toHaveProperty('activeOrders');
    expect(res.body).toHaveProperty('completedOrders');
    expect(res.body).toHaveProperty('tailorPerformance');
    expect(res.body).toHaveProperty('weeklyTrends');
    expect(res.body).toHaveProperty('averageReturnRate');
  });
});
