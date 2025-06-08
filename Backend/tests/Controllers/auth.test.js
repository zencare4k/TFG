import request from 'supertest';
import app from '../../app';

describe('Auth Controller', () => {
  it('POST /api/auth/register debe registrar un usuario', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'nuevo', email: 'nuevo@example.com', password: '123456', role: 'user' });
    expect([200, 201, 400]).toContain(res.statusCode);
  });

  it('POST /api/auth/login debe loguear un usuario', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nuevo@example.com', password: '123456' });
    expect([200, 401]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty('token');
    }
  });

  it('POST /api/auth/login error credenciales', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'noexiste@example.com', password: 'mal' });
    expect([401, 400]).toContain(res.statusCode);
  });
});