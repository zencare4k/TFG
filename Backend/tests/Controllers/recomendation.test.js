import request from 'supertest';
import app from '../../app';
import { jest } from '@jest/globals';

 
describe('Recommendations Controller', () => {
  it('GET /api/recommendations requiere autenticación', async () => {
    const res = await request(app).get('/api/recommendations');
    expect([401, 403]).toContain(res.statusCode);
  });
});