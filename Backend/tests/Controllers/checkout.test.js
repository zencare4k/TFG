import request from 'supertest';
import app from '../../app';
  
describe('Checkout Controller', () => {
  it('POST /api/checkout devuelve error sin datos', async () => {
    const res = await request(app)
      .post('/api/checkout')
      .send({});
    expect([400, 401]).toContain(res.statusCode);
  });
});