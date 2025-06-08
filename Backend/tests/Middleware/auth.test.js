import { authMiddleware, adminMiddleware, roleMiddleware } from '../../src/Middleware/auth.js';
import jwt from 'jsonwebtoken';

const mockUser = { id: '1', role: 'systemAdmin', isAdmin: true };
const token = jwt.sign(mockUser, 'testsecret');

describe('authMiddleware', () => {
  it('permite acceso con token válido', () => {
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

describe('adminMiddleware', () => {
  it('permite acceso a admin', () => {
    const req = { user: { role: 'systemAdmin', isAdmin: true } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    adminMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('deniega acceso a no admin', () => {
    const req = { user: { role: 'user', isAdmin: false } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    adminMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
  });
});

describe('roleMiddleware', () => {
  it('permite acceso con rol correcto', () => {
    const req = { user: { role: 'productAdmin' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    roleMiddleware('productAdmin')(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('deniega acceso con rol incorrecto', () => {
    const req = { user: { role: 'user' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    roleMiddleware('productAdmin')(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
  });
});