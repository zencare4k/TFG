import { findUserByEmail, findUserByUsername, createUser } from '../../src/Models/users.js';

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
});