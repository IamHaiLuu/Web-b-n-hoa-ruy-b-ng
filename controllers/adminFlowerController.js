import sanitizeHtml from 'sanitize-html';
import Category from '../models/Category.js';
import Flower from '../models/Flower.js';
import { createUniqueSlug } from '../services/slugService.js';
import { UPLOAD_FOLDERS, deleteAsset, deleteManyAssets, uploadMany } from '../services/cloudinaryService.js';
import { normalizeImages, normalizeList } from '../services/imageService.js';
import { getPagination } from '../utils/pagination.js';
import { adminSort, escapeRegex } from '../utils/queryBuilder.js';

const ADMIN_LIMIT = 10;

function cleanText(value = '') {
  return sanitizeHtml(String(value || '').trim(), { allowedTags: [], allowedAttributes: {} });
}

function cleanRichText(value = '') {
  return sanitizeHtml(String(value || '').trim(), {
    allowedTags: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    allowedAttributes: {}
  });
}

function asArray(value) {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

async function getFormContext(extra = {}) {
  const categories = await Category.find({ deletedAt: null }).sort({ sortOrder: 1, name: 1 }).lean();
  return {
    categories,
    errors: {},
    old: {},
    ...extra
  };
}

function buildPayload(body) {
  return {
    name: cleanText(body.name),
    category: body.category,
    referencePrice: Number(body.referencePrice || 0),
    shortDescription: cleanText(body.shortDescription),
    description: cleanRichText(body.description),
    suitableOccasions: normalizeList(body.suitableOccasions).map(cleanText),
    mainColors: normalizeList(body.mainColors).map(cleanText),
    sizeNote: cleanText(body.sizeNote),
    tags: normalizeList(body.tags).map(cleanText),
    internalNote: cleanText(body.internalNote),
    availabilityStatus: body.availabilityStatus === 'out_of_stock' ? 'out_of_stock' : 'available',
    visibilityStatus: body.visibilityStatus === 'hidden' ? 'hidden' : 'visible',
    isFeatured: body.isFeatured === 'on' || body.isFeatured === 'true'
  };
}

function mapUploadedImages(uploaded, flowerName, startOrder = 0) {
  return uploaded.map((image, index) => ({
    ...image,
    alt: `${flowerName} ${index + 1}`,
    isPrimary: startOrder === 0 && index === 0,
    sortOrder: startOrder + index
  }));
}

export async function index(req, res, next) {
  try {
    const filter = { deletedAt: null };
    if (req.query.q) {
      const regex = new RegExp(escapeRegex(req.query.q), 'i');
      filter.$or = [{ name: regex }, { shortDescription: regex }, { tags: regex }];
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (['visible', 'hidden'].includes(req.query.visibilityStatus)) {
      filter.visibilityStatus = req.query.visibilityStatus;
    }
    if (['available', 'out_of_stock'].includes(req.query.availabilityStatus)) {
      filter.availabilityStatus = req.query.availabilityStatus;
    }
    if (req.query.isFeatured === 'true') {
      filter.isFeatured = true;
    }

    const totalItems = await Flower.countDocuments(filter);
    const pagination = getPagination(req.query.page, ADMIN_LIMIT, totalItems);
    const [flowers, categories] = await Promise.all([
      Flower.find(filter)
        .populate('category')
        .sort(adminSort(req.query.sort))
        .skip(pagination.skip)
        .limit(ADMIN_LIMIT)
        .lean(),
      Category.find({ deletedAt: null }).sort({ sortOrder: 1, name: 1 }).lean()
    ]);

    return res.render('admin/flowers/index', {
      pageTitle: 'Quản lý hoa',
      flowers,
      categories,
      pagination
    });
  } catch (error) {
    return next(error);
  }
}

export async function newForm(req, res, next) {
  try {
    return res.render('admin/flowers/new', {
      pageTitle: 'Thêm mẫu hoa',
      ...(await getFormContext())
    });
  } catch (error) {
    return next(error);
  }
}

export async function create(req, res, next) {
  const uploadedImages = [];
  try {
    const errors = req.validationErrors || {};
    if (!req.files?.length) {
      errors.images = 'Cần upload ít nhất 1 ảnh sản phẩm.';
    }

    if (Object.keys(errors).length) {
      return res.status(422).render('admin/flowers/new', {
        pageTitle: 'Thêm mẫu hoa',
        ...(await getFormContext({ errors, old: req.body }))
      });
    }

    const payload = buildPayload(req.body);
    const uploaded = await uploadMany(req.files, UPLOAD_FOLDERS.flowers);
    uploadedImages.push(...uploaded);
    const images = mapUploadedImages(uploaded, payload.name);

    const flower = await Flower.create({
      ...payload,
      slug: await createUniqueSlug(Flower, payload.name),
      images: normalizeImages(images),
      createdBy: req.currentAdmin._id,
      updatedBy: req.currentAdmin._id
    });

    req.flash('success', 'Đã thêm mẫu hoa mới.');
    return res.redirect(`/admin/flowers/${flower._id}`);
  } catch (error) {
    await deleteManyAssets(uploadedImages.map((image) => image.publicId));
    if (error.statusCode === 400) {
      return res.status(400).render('admin/flowers/new', {
        pageTitle: 'Thêm mẫu hoa',
        ...(await getFormContext({ errors: { images: error.message }, old: req.body }))
      });
    }
    return next(error);
  }
}

export async function show(req, res, next) {
  try {
    const flower = await Flower.findOne({ _id: req.params.id, deletedAt: null })
      .populate('category')
      .populate('updatedBy', 'name email')
      .lean();

    if (!flower) {
      req.flash('error', 'Không tìm thấy mẫu hoa.');
      return res.redirect('/admin/flowers');
    }

    return res.render('admin/flowers/show', {
      pageTitle: flower.name,
      flower
    });
  } catch (error) {
    return next(error);
  }
}

export async function editForm(req, res, next) {
  try {
    const flower = await Flower.findOne({ _id: req.params.id, deletedAt: null }).lean();
    if (!flower) {
      req.flash('error', 'Không tìm thấy mẫu hoa.');
      return res.redirect('/admin/flowers');
    }

    return res.render('admin/flowers/edit', {
      pageTitle: `Chỉnh sửa ${flower.name}`,
      flower,
      ...(await getFormContext())
    });
  } catch (error) {
    return next(error);
  }
}

export async function update(req, res, next) {
  const uploadedImages = [];
  try {
    const flower = await Flower.findOne({ _id: req.params.id, deletedAt: null });
    if (!flower) {
      req.flash('error', 'Không tìm thấy mẫu hoa.');
      return res.redirect('/admin/flowers');
    }

    const errors = req.validationErrors || {};
    const deleteImageIds = new Set(asArray(req.body.deleteImageIds));
    const remainingImages = flower.images.filter((image) => !deleteImageIds.has(image._id.toString()));

    if (!remainingImages.length && !req.files?.length) {
      errors.images = 'Sản phẩm cần còn ít nhất 1 ảnh.';
    }

    if (Object.keys(errors).length) {
      return res.status(422).render('admin/flowers/edit', {
        pageTitle: `Chỉnh sửa ${flower.name}`,
        flower: flower.toObject(),
        ...(await getFormContext({ errors, old: req.body }))
      });
    }

    const payload = buildPayload(req.body);
    const deletedPublicIds = flower.images
      .filter((image) => deleteImageIds.has(image._id.toString()))
      .map((image) => image.publicId);

    let finalImages = remainingImages.map((image, index) => ({
      url: image.url,
      publicId: image.publicId,
      alt: image.alt || payload.name,
      isPrimary: image._id.toString() === req.body.primaryImageId,
      sortOrder: index
    }));

    if (req.files?.length) {
      const uploaded = await uploadMany(req.files, UPLOAD_FOLDERS.flowers);
      uploadedImages.push(...uploaded);
      finalImages = finalImages.concat(mapUploadedImages(uploaded, payload.name, finalImages.length));
    }

    finalImages = normalizeImages(finalImages);

    const nameChanged = payload.name !== flower.name;
    flower.set({
      ...payload,
      slug: nameChanged ? await createUniqueSlug(Flower, payload.name, flower._id) : flower.slug,
      images: finalImages,
      updatedBy: req.currentAdmin._id
    });
    await flower.save();
    await deleteManyAssets(deletedPublicIds);

    req.flash('success', 'Đã lưu thay đổi mẫu hoa.');
    return res.redirect(`/admin/flowers/${flower._id}`);
  } catch (error) {
    await deleteManyAssets(uploadedImages.map((image) => image.publicId));
    if (error.statusCode === 400) {
      const flower = await Flower.findOne({ _id: req.params.id, deletedAt: null }).lean();
      return res.status(400).render('admin/flowers/edit', {
        pageTitle: 'Chỉnh sửa mẫu hoa',
        flower,
        ...(await getFormContext({ errors: { images: error.message }, old: req.body }))
      });
    }
    return next(error);
  }
}

export async function toggleVisibility(req, res, next) {
  try {
    const flower = await Flower.findOne({ _id: req.params.id, deletedAt: null });
    if (flower) {
      flower.visibilityStatus = flower.visibilityStatus === 'visible' ? 'hidden' : 'visible';
      flower.updatedBy = req.currentAdmin._id;
      await flower.save();
      req.flash('success', 'Đã cập nhật trạng thái hiển thị.');
    }
    return res.redirect(req.get('Referer') || '/admin/flowers');
  } catch (error) {
    return next(error);
  }
}

export async function toggleFeatured(req, res, next) {
  try {
    const flower = await Flower.findOne({ _id: req.params.id, deletedAt: null });
    if (flower) {
      flower.isFeatured = !flower.isFeatured;
      flower.updatedBy = req.currentAdmin._id;
      await flower.save();
      req.flash('success', 'Đã cập nhật trạng thái nổi bật.');
    }
    return res.redirect(req.get('Referer') || '/admin/flowers');
  } catch (error) {
    return next(error);
  }
}

export async function softDelete(req, res, next) {
  try {
    const flower = await Flower.findOne({ _id: req.params.id, deletedAt: null });
    if (flower) {
      flower.deletedAt = new Date();
      flower.updatedBy = req.currentAdmin._id;
      await flower.save();
      req.flash('success', 'Đã xóa mềm mẫu hoa khỏi hệ thống quản lý chính.');
    }
    return res.redirect('/admin/flowers');
  } catch (error) {
    return next(error);
  }
}

export async function deleteImage(req, res, next) {
  try {
    const flower = await Flower.findOne({ _id: req.params.id, deletedAt: null });
    if (!flower) {
      req.flash('error', 'Không tìm thấy mẫu hoa.');
      return res.redirect('/admin/flowers');
    }

    if (flower.images.length <= 1) {
      req.flash('error', 'Sản phẩm cần còn ít nhất 1 ảnh.');
      return res.redirect(`/admin/flowers/${flower._id}/edit`);
    }

    const image = flower.images.id(req.params.imageId);
    if (image) {
      const publicId = image.publicId;
      image.deleteOne();
      flower.images = normalizeImages(flower.images);
      await flower.save();
      await deleteAsset(publicId);
      req.flash('success', 'Đã xóa ảnh sản phẩm.');
    }

    return res.redirect(`/admin/flowers/${flower._id}/edit`);
  } catch (error) {
    return next(error);
  }
}

export async function bulk(req, res, next) {
  try {
    const ids = asArray(req.body.selectedIds).filter(Boolean);
    if (!ids.length) {
      req.flash('error', 'Vui lòng chọn ít nhất một mẫu hoa.');
      return res.redirect('/admin/flowers');
    }

    const filter = { _id: { $in: ids }, deletedAt: null };
    const action = req.body.action;
    const updateMap = {
      hide: { visibilityStatus: 'hidden' },
      show: { visibilityStatus: 'visible' },
      feature: { isFeatured: true },
      unfeature: { isFeatured: false },
      delete: { deletedAt: new Date() }
    };

    if (!updateMap[action]) {
      req.flash('error', 'Hành động không hợp lệ.');
      return res.redirect('/admin/flowers');
    }

    await Flower.updateMany(filter, {
      ...updateMap[action],
      updatedBy: req.currentAdmin._id
    });

    req.flash('success', 'Đã áp dụng hành động hàng loạt.');
    return res.redirect('/admin/flowers');
  } catch (error) {
    return next(error);
  }
}
