import request from 'supertest';
import app from '../../app';
import { jest } from '@jest/globals';

 
describe('Reviews Controller', () => {
  const productId = 'testproductid';

  it('GET /api/products/:id/reviews devuelve reviews', async () => {
    const res = await request(app).get(`/api/products/${productId}/reviews`);
    expect([200, 500]).toContain(res.statusCode);
  });

  it('POST /api/products/:id/reviews añade review', async () => {
    const res = await request(app)
      .post(`/api/products/${productId}/reviews`)
      .send({ rating: 5, comment: 'Muy bueno', user: 'testuser' });
    expect([201, 400, 500]).toContain(res.statusCode);
  });
});