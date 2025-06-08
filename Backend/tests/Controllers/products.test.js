import request from 'supertest';
import app from '../../app';

describe('Products Controller', () => {
  let createdProductId;

  it('GET /api/products debe devolver todos los productos', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/products debe crear un producto', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: 'Producto Test', price: 10, category: 'test', stock: 5 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message');
    // Guarda el ID para limpiar después si tu API lo devuelve
    if (res.body.product && res.body.product._id) {
      createdProductId = res.body.product._id;
    }
  });

  afterAll(async () => {
    // Limpia el producto de prueba si tu API lo permite
    if (createdProductId) {
      await request(app).delete(`/api/products/${createdProductId}`);
    }
    // Si usas una conexión a base de datos, ciérrala aquí
    if (app.close) await app.close();
  });
});