import request from 'supertest';
import app from '../../app';

describe('Users Controller', () => {
  it('GET /api/users debe devolver todos los usuarios', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/users debe crear un usuario', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'testuser', email: 'test@example.com', password: '123456', role: 'user' });
    expect([201, 400]).toContain(res.statusCode); // 400 si ya existe
    if (res.statusCode === 201) {
      expect(res.body).toHaveProperty('message');
    }
  });
});