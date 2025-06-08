import { authMiddleware, adminMiddleware, roleMiddleware } from '../../src/Middleware/auth.js';
import jwt from 'jsonwebtoken';

describe('authMiddleware', () => {
  it('permite acceso con token válido', () => {
    const mockUser = { id: '1', role: 'systemAdmin', isAdmin: true };
    const token = jwt.sign(mockUser, 'testsecret');
    const req = { header: () => `Bearer ${token}` };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    process.env.JWT_SECRET = 'testsecret';
    authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
  });

  it('deniega acceso sin token', () => {
    const req = { header: () => null };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });
});