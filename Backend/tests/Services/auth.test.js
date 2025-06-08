import * as authService from '../../src/Services/auth.js';

describe('Auth Service', () => {
  let userId;

  it('registerUser debe registrar un usuario', async () => {
    const user = await authService.registerUser({ name: 'TestUser', email: 'testuser@example.com', password: '123456' });
    expect(user).toHaveProperty('name', 'TestUser');
    expect(user).toHaveProperty('email', 'testuser@example.com');
    userId = user._id || user.insertedId;
  });

  it('loginUser debe devolver usuario y token', async () => {
    const { user, token } = await authService.loginUser('testuser@example.com', '123456');
    expect(user).toBeDefined();
    expect(token).toBeDefined();
  });

  it('loginUser lanza error con email incorrecto', async () => {
    await expect(authService.loginUser('noexiste@example.com', '123456')).rejects.toThrow('Credenciales inválidas');
  });

  it('loginUser lanza error con contraseña incorrecta', async () => {
    await expect(authService.loginUser('testuser@example.com', 'contramal')).rejects.toThrow('Credenciales inválidas');
  });

  it('getUserById debe devolver el usuario', async () => {
    if (!userId) return;
    const user = await authService.getUserById(userId);
    expect(user).toBeDefined();
    expect(user.email).toBe('testuser@example.com');
  });

  it('getUserById lanza error si el usuario no existe', async () => {
    await expect(authService.getUserById('000000000000000000000000')).rejects.toThrow('Usuario no encontrado');
  });
});