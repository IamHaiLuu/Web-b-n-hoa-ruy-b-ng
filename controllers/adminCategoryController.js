import sanitizeHtml from 'sanitize-html';
import Category from '../models/Category.js';
import Flower from '../models/Flower.js';
import { createUniqueSlug } from '../services/slugService.js';

function clean(value = '') {
  return sanitizeHtml(String(value || '').trim(), { allowedTags: [], allowedAttributes: {} });
}

function payload(body) {
  return {
    name: clean(body.name),
    description: clean(body.description),
    icon: clean(body.icon) || 'local_florist',
    sortOrder: Number(body.sortOrder || 0),
    isVisible: body.isVisible === 'on' || body.isVisible === 'true'
  };
}

async function listContext(extra = {}) {
  const categories = await Category.find({ deletedAt: null }).sort({ sortOrder: 1, name: 1 }).lean();
  const categoriesWithCounts = await Promise.all(
    categories.map(async (category) => ({
      ...category,
      flowerCount: await Flower.countDocuments({ deletedAt: null, category: category._id })
    }))
  );

  return {
    categories: categoriesWithCounts,
    errors: {},
    old: {},
    editingCategory: null,
    ...extra
  };
}

export async function index(req, res, next) {
  try {
    return res.render('admin/categories/index', {
      pageTitle: 'Danh mục hoa',
      ...(await listContext())
    });
  } catch (error) {
    return next(error);
  }
}

export async function create(req, res, next) {
  try {
    const errors = req.validationErrors || {};
    if (Object.keys(errors).length) {
      return res.status(422).render('admin/categories/index', {
        pageTitle: 'Danh mục hoa',
        ...(await listContext({ errors, old: req.body }))
      });
    }

    const data = payload(req.body);
    await Category.create({
      ...data,
      slug: await createUniqueSlug(Category, data.name)
    });

    req.flash('success', 'Đã thêm danh mục.');
    return res.redirect('/admin/categories');
  } catch (error) {
    if (error.code === 11000) {
      return res.status(422).render('admin/categories/index', {
        pageTitle: 'Danh mục hoa',
        ...(await listContext({
          errors: { name: 'Tên danh mục đã tồn tại.' },
          old: req.body
        }))
      });
    }
    return next(error);
  }
}

export async function edit(req, res, next) {
  try {
    const editingCategory = await Category.findOne({ _id: req.params.id, deletedAt: null }).lean();
    if (!editingCategory) {
      req.flash('error', 'Không tìm thấy danh mục.');
      return res.redirect('/admin/categories');
    }

    return res.render('admin/categories/index', {
      pageTitle: 'Sửa danh mục',
      ...(await listContext({ editingCategory, old: editingCategory }))
    });
  } catch (error) {
    return next(error);
  }
}

export async function update(req, res, next) {
  try {
    const category = await Category.findOne({ _id: req.params.id, deletedAt: null });
    if (!category) {
      req.flash('error', 'Không tìm thấy danh mục.');
      return res.redirect('/admin/categories');
    }

    const errors = req.validationErrors || {};
    if (Object.keys(errors).length) {
      return res.status(422).render('admin/categories/index', {
        pageTitle: 'Sửa danh mục',
        ...(await listContext({
          errors,
          old: req.body,
          editingCategory: category.toObject()
        }))
      });
    }

    const data = payload(req.body);
    const nameChanged = data.name !== category.name;
    category.set({
      ...data,
      slug: nameChanged ? await createUniqueSlug(Category, data.name, category._id) : category.slug
    });
    await category.save();

    req.flash('success', 'Đã cập nhật danh mục.');
    return res.redirect('/admin/categories');
  } catch (error) {
    return next(error);
  }
}

export async function toggleVisibility(req, res, next) {
  try {
    const category = await Category.findOne({ _id: req.params.id, deletedAt: null });
    if (category) {
      category.isVisible = !category.isVisible;
      await category.save();
      req.flash('success', 'Đã cập nhật trạng thái danh mục.');
    }
    return res.redirect('/admin/categories');
  } catch (error) {
    return next(error);
  }
}

export async function softDelete(req, res, next) {
  try {
    const activeFlowers = await Flower.countDocuments({
      category: req.params.id,
      deletedAt: null
    });

    if (activeFlowers > 0) {
      req.flash('error', 'Không thể xóa danh mục đang có mẫu hoa sử dụng.');
      return res.redirect('/admin/categories');
    }

    const category = await Category.findOne({ _id: req.params.id, deletedAt: null });
    if (category) {
      category.deletedAt = new Date();
      await category.save();
      req.flash('success', 'Đã xóa danh mục.');
    }

    return res.redirect('/admin/categories');
  } catch (error) {
    return next(error);
  }
}
