import sanitizeHtml from 'sanitize-html';
import StoreSettings from '../models/StoreSettings.js';
import { UPLOAD_FOLDERS, deleteAsset, uploadBuffer } from '../services/cloudinaryService.js';

function clean(value = '') {
  return sanitizeHtml(String(value || '').trim(), { allowedTags: [], allowedAttributes: {} });
}

function payload(body) {
  return {
    storeName: clean(body.storeName),
    phone: clean(body.phone),
    zalo: clean(body.zalo),
    address: clean(body.address),
    openingHours: clean(body.openingHours),
    googleMapsUrl: clean(body.googleMapsUrl),
    description: clean(body.description)
  };
}

export async function index(req, res, next) {
  try {
    const settings = await StoreSettings.getSingleton();
    return res.render('admin/settings/index', {
      pageTitle: 'Cài đặt cửa hàng',
      settings
    });
  } catch (error) {
    return next(error);
  }
}

export async function update(req, res, next) {
  const uploaded = [];
  try {
    const settings = await StoreSettings.getSingleton();
    const errors = req.validationErrors || {};

    if (Object.keys(errors).length) {
      return res.status(422).render('admin/settings/index', {
        pageTitle: 'Cài đặt cửa hàng',
        settings: { ...settings.toObject(), ...req.body },
        errors
      });
    }

    const data = payload(req.body);
    const updates = { ...data };

    if (req.files?.logo?.[0]) {
      const logo = await uploadBuffer(req.files.logo[0], UPLOAD_FOLDERS.settings);
      uploaded.push(logo);
      if (settings.logo?.publicId) {
        await deleteAsset(settings.logo.publicId);
      }
      updates.logo = logo;
    }

    if (req.files?.banner?.[0]) {
      const banner = await uploadBuffer(req.files.banner[0], UPLOAD_FOLDERS.settings);
      uploaded.push(banner);
      if (settings.banner?.publicId) {
        await deleteAsset(settings.banner.publicId);
      }
      updates.banner = banner;
    }

    settings.set(updates);
    await settings.save();

    req.flash('success', 'Đã lưu cài đặt cửa hàng.');
    return res.redirect('/admin/settings');
  } catch (error) {
    for (const image of uploaded) {
      await deleteAsset(image.publicId);
    }
    if (error.statusCode === 400) {
      const settings = await StoreSettings.getSingleton();
      return res.status(400).render('admin/settings/index', {
        pageTitle: 'Cài đặt cửa hàng',
        settings: { ...settings.toObject(), ...req.body },
        errors: { banner: error.message }
      });
    }
    return next(error);
  }
}
