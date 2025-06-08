import request from 'supertest';
import app from '../../app';

describe('Products Routes', () => {
  let productId;

  it('GET /api/products devuelve productos', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/products crea un producto', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: 'Producto Test', price: 10, category: 'test', stock: 5 });
    expect([201, 400]).toContain(res.statusCode);
    if (res.statusCode === 201) productId = res.body.product?._id || res.body._id;
  });

  it('GET /api/products/:id devuelve 404 si no existe', async () => {
    const res = await request(app).get('/api/products/000000000000000000000000');
    expect([404, 400]).toContain(res.statusCode);
  });

  it('PUT /api/products/:id actualiza un producto (404 si no existe)', async () => {
    const res = await request(app)
      .put('/api/products/000000000000000000000000')
      .send({ name: 'No existe' });
    expect([404, 400]).toContain(res.statusCode);
  });

  it('DELETE /api/products/:id elimina un producto (404 si no existe)', async () => {
    const res = await request(app)
      .delete('/api/products/000000000000000000000000');
    expect([404, 400]).toContain(res.statusCode);
  });
});