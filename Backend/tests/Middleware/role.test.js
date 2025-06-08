import { systemAdminMiddleware, requireRole } from '../../src/Middleware/role.js';

describe('systemAdminMiddleware', () => {
  it('permite acceso a systemadmin', () => {
    const req = { user: { role: 'systemadmin' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    systemAdminMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('deniega acceso a otros roles', () => {
    const req = { user: { role: 'user' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    systemAdminMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
  });
});

describe('requireRole', () => {
  it('permite acceso con rol correcto', () => {
    const req = { user: { role: 'productAdmin' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    requireRole('productAdmin')(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('deniega acceso con rol incorrecto', () => {
    const req = { user: { role: 'user' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    requireRole('productAdmin')(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
  });
});