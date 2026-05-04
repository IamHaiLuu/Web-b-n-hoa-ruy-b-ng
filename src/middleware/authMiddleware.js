import Admin from '../models/Admin.js';

export async function attachCurrentAdmin(req, res, next) {
  try {
    res.locals.currentAdmin = null;
    if (!req.session?.adminId) {
      return next();
    }

    const admin = await Admin.findById(req.session.adminId).select('-passwordHash');
    if (!admin || !admin.isActive) {
      req.session.adminId = null;
      return next();
    }

    req.currentAdmin = admin;
    res.locals.currentAdmin = admin;
    return next();
  } catch (error) {
    return next(error);
  }
}

export function requireAdmin(req, res, next) {
  if (!req.currentAdmin) {
    req.flash('error', 'Vui lòng đăng nhập để tiếp tục.');
    return res.redirect('/admin/login');
  }
  return next();
}

export function redirectIfAuthenticated(req, res, next) {
  if (req.currentAdmin) {
    return res.redirect('/admin');
  }
  return next();
}
