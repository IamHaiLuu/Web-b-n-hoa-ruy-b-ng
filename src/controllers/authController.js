import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import Admin from '../models/Admin.js';

export function showLogin(req, res) {
  return res.render('auth/login', {
    pageTitle: 'Đăng nhập quản trị',
    old: { email: req.flash('oldEmail')[0] || '' }
  });
}

export async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error', 'Vui lòng kiểm tra email và mật khẩu.');
      req.flash('oldEmail', req.body.email || '');
      return res.redirect('/admin/login');
    }

    const email = String(req.body.email || '').toLowerCase().trim();
    const admin = await Admin.findOne({ email, isActive: true });
    const isValid = admin ? await bcrypt.compare(req.body.password, admin.passwordHash) : false;

    if (!isValid) {
      req.flash('error', 'Email hoặc mật khẩu không đúng.');
      req.flash('oldEmail', req.body.email || '');
      return res.redirect('/admin/login');
    }

    req.session.adminId = admin._id.toString();
    admin.lastLoginAt = new Date();
    await admin.save();

    req.flash('success', 'Đăng nhập thành công.');
    return res.redirect('/admin');
  } catch (error) {
    return next(error);
  }
}

export function logout(req, res, next) {
  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }
    res.clearCookie('menuhoa.sid');
    return res.redirect('/admin/login');
  });
}
