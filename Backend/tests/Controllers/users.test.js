import { findUserByEmail, findUserByUsername, createUser } from '../../src/Models/users.js';
import { jest } from '@jest/globals';

 
describe('Users Model', () => {
  it('findUserByEmail debe devolver null si no existe', async () => {
    const user = await findUserByEmail('noexiste@example.com');
    expect(user).toBeNull();
  });

  it('findUserByUsername debe devolver null si no existe', async () => {
    const user = await findUserByUsername('usuarioinexistente');
    expect(user).toBeNull();
  });

  it('createUser debe crear un usuario', async () => {
    const userId = await createUser('testuser', 'testuser@example.com', '123456', 'user');
    expect(userId).toBeDefined();
  });

  it('createUser lanza error si falta el email', async () => {
    await expect(createUser('testuser2', '', '123456', 'user')).rejects.toThrow();
  });

  it('createUser lanza error si el usuario ya existe', async () => {
    await createUser('testuser3', 'testuser3@example.com', '123456', 'user');
    await expect(createUser('testuser3', 'testuser3@example.com', '123456', 'user')).rejects.toThrow();
  });

  it('findUserByEmail devuelve el usuario si existe', async () => {
    await createUser('testuser4', 'testuser4@example.com', '123456', 'user');
    const user = await findUserByEmail('testuser4@example.com');
    expect(user).not.toBeNull();
    expect(user.email).toBe('testuser4@example.com');
  });
});