import express from 'express';
import expressLoader from '../../src/Loaders/express.js';

describe('Express Loader', () => {
  it('debe inicializar express sin errores', () => {
    const app = express();
    expect(() => expressLoader(app)).not.toThrow();
  });
});