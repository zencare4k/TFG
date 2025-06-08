import request from 'supertest';
import app from '../../app';

describe('Users Routes', () => {
  it('GET /api/users devuelve todos los usuarios', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/users crea un usuario', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'testuser', email: 'testuser@example.com', password: '123456', role: 'user' });
    expect([201, 400]).toContain(res.statusCode);
  });
});