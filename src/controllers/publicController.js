import Category from '../models/Category.js';
import Flower from '../models/Flower.js';
import StoreSettings from '../models/StoreSettings.js';
import { getPagination } from '../utils/pagination.js';
import { escapeRegex, priceRangeFilter } from '../utils/queryBuilder.js';

const PUBLIC_LIMIT = 12;

async function getPublicContext() {
  const [categories, settings] = await Promise.all([
    Category.find({ deletedAt: null, isVisible: true }).sort({ sortOrder: 1, name: 1 }).lean(),
    StoreSettings.getSingleton()
  ]);
  return { categories, settings };
}

export async function home(req, res, next) {
  try {
    const { categories, settings } = await getPublicContext();
    const filter = { deletedAt: null, visibilityStatus: 'visible' };
    const activeCategory = req.query.category
      ? await Category.findOne({
          slug: req.query.category,
          deletedAt: null,
          isVisible: true
        }).lean()
      : null;

    if (activeCategory) {
      filter.category = activeCategory._id;
    }

    if (req.query.q) {
      const regex = new RegExp(escapeRegex(req.query.q), 'i');
      filter.$or = [{ name: regex }, { shortDescription: regex }, { tags: regex }];
    }

    const priceFilter = priceRangeFilter(req.query.price);
    if (priceFilter) {
      filter.referencePrice = priceFilter;
    }

    if (['available', 'out_of_stock'].includes(req.query.status)) {
      filter.availabilityStatus = req.query.status;
    }

    const totalItems = await Flower.countDocuments(filter);
    const pagination = getPagination(req.query.page, PUBLIC_LIMIT, totalItems);
    const [flowers, featuredFlowers] = await Promise.all([
      Flower.find(filter)
        .populate('category')
        .sort({ updatedAt: -1 })
        .skip(pagination.skip)
        .limit(PUBLIC_LIMIT)
        .lean(),
      Flower.find({
        deletedAt: null,
        visibilityStatus: 'visible',
        isFeatured: true
      })
        .populate('category')
        .sort({ updatedAt: -1 })
        .limit(6)
        .lean()
    ]);

    return res.render('public/home', {
      pageTitle: 'Menu Hoa - Menu hoa tươi pastel',
      categories,
      settings,
      flowers,
      featuredFlowers,
      activeCategory,
      pagination
    });
  } catch (error) {
    return next(error);
  }
}

export function flowersAlias(req, res) {
  const query = new URLSearchParams(req.query).toString();
  return res.redirect(`/${query ? `?${query}` : ''}`);
}

export async function flowerDetail(req, res, next) {
  try {
    const [flower, settings, categories] = await Promise.all([
      Flower.findOne({
        slug: req.params.slug,
        deletedAt: null,
        visibilityStatus: 'visible'
      })
        .populate('category')
        .lean(),
      StoreSettings.getSingleton(),
      Category.find({ deletedAt: null, isVisible: true }).sort({ sortOrder: 1, name: 1 }).lean()
    ]);

    if (!flower) {
      return res.status(404).render('public/not-found', {
        pageTitle: 'Không tìm thấy mẫu hoa',
        message: 'Mẫu hoa này không tồn tại hoặc đang tạm ẩn khỏi menu.'
      });
    }

    const relatedFlowers = await Flower.find({
      _id: { $ne: flower._id },
      category: flower.category?._id,
      deletedAt: null,
      visibilityStatus: 'visible'
    })
      .populate('category')
      .sort({ updatedAt: -1 })
      .limit(4)
      .lean();

    return res.render('public/flower-detail', {
      pageTitle: `${flower.name} - Menu Hoa`,
      flower,
      settings,
      categories,
      relatedFlowers
    });
  } catch (error) {
    return next(error);
  }
}

export async function contact(req, res, next) {
  try {
    const [settings, categories] = await Promise.all([
      StoreSettings.getSingleton(),
      Category.find({ deletedAt: null, isVisible: true }).sort({ sortOrder: 1, name: 1 }).lean()
    ]);

    return res.render('public/contact', {
      pageTitle: 'Liên hệ cửa hàng - Menu Hoa',
      settings,
      categories
    });
  } catch (error) {
    return next(error);
  }
}
