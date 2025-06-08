import express from 'express';
import loaders from '../../src/Loaders/index.js';

describe('Loaders Index', () => {
  it('debe inicializar loaders sin errores', async () => {
    const app = express();
    await expect(loaders.init(app)).resolves.not.toThrow();
  });
});