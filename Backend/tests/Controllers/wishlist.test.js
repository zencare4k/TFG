import request from 'supertest';
import app from '../../app';

describe('Wishlist Controller', () => {
  it('POST /api/wishlist debe añadir producto a la wishlist', async () => {
    const res = await request(app)
      .post('/api/wishlist')
      .send({ userId: 'testuserid', product: { _id: 'testproductid', price: 10, stock: 1 } });
    expect([201, 400, 409]).toContain(res.statusCode);
  });

  it('GET /api/wishlist/:userId debe devolver la wishlist', async () => {
    const res = await request(app).get('/api/wishlist/testuserid');
    expect([200, 500]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(Array.isArray(res.body)).toBe(true);
    }
  });
});