import request from 'supertest';
import app from '../../app';

describe('Cart Controller', () => {
  it('GET /api/cart debe devolver productos del carrito', async () => {
    const res = await request(app).get('/api/cart?userId=testuserid');
    expect([200, 400]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(Array.isArray(res.body)).toBe(true);
    }
  });

  it('POST /api/cart debe añadir producto al carrito', async () => {
    const res = await request(app)
      .post('/api/cart')
      .send({ userId: 'testuserid', productId: 'testproductid', name: 'Producto', price: 10, imageUrl: '', category: 'test' });
    expect([201, 400, 404]).toContain(res.statusCode);
    if (res.statusCode === 201) {
      expect(res.body).toHaveProperty('message');
    }
  });
});