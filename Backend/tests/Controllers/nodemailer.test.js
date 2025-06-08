import request from 'supertest';
import app from '../../app';
import { jest } from '@jest/globals';



describe('Nodemailer Controller', () => {
  it('POST /api/email/order-confirmation devuelve error si faltan datos', async () => {
    const res = await request(app)
      .post('/api/email/order-confirmation')
      .send({});
    expect([400, 500]).toContain(res.statusCode);
  });
});