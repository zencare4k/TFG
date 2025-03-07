import request from 'supertest';
import app from '../../app'; // Asegúrate de que este sea el punto de entrada de tu aplicación

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        isAdmin: false
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not register an admin without admin password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        isAdmin: true
      });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('error', 'Contraseña de administrador incorrecta');
  });

  it('should register an admin with correct admin password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        isAdmin: true,
        adminPassword: 'pass_secreta_xd'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name');
  });
});