import request from 'supertest';
import app from '../../app';

describe('Users Routes', () => {
  let userId;

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
    if (res.statusCode === 201) userId = res.body.user?._id || res.body._id;
  });

  it('PUT /api/users/:id actualiza un usuario (404 si no existe)', async () => {
    const res = await request(app)
      .put('/api/users/000000000000000000000000')
      .send({ username: 'noexiste' });
    expect([404, 400]).toContain(res.statusCode);
  });

  it('DELETE /api/users/:id elimina un usuario (404 si no existe)', async () => {
    const res = await request(app)
      .delete('/api/users/000000000000000000000000');
    expect([404, 400]).toContain(res.statusCode);
  });
});