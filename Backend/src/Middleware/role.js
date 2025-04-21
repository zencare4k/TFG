export const systemAdminMiddleware = (req, res, next) => {
    if (req.user?.role !== "systemadmin") {
      return res.status(403).json({ error: "Acceso denegado: solo systemadmin puede realizar esta acción." });
    }
    next();
  };