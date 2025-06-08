import { connectProductDB } from '../../src/Models/products.js';

describe('Products Model', () => {
  it('connectProductDB debe conectar a la base de datos', async () => {
    const db = await connectProductDB();
    expect(db).toBeDefined();
  });
});