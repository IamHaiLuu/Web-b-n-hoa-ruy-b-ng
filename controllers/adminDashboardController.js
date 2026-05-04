import Category from '../models/Category.js';
import Flower from '../models/Flower.js';

export async function dashboard(req, res, next) {
  try {
    const [
      totalFlowers,
      visibleFlowers,
      hiddenFlowers,
      outOfStockFlowers,
      categories,
      recentFlowers,
      featuredFlowers
    ] = await Promise.all([
      Flower.countDocuments({ deletedAt: null }),
      Flower.countDocuments({ deletedAt: null, visibilityStatus: 'visible' }),
      Flower.countDocuments({ deletedAt: null, visibilityStatus: 'hidden' }),
      Flower.countDocuments({ deletedAt: null, availabilityStatus: 'out_of_stock' }),
      Category.find({ deletedAt: null }).sort({ sortOrder: 1, name: 1 }).lean(),
      Flower.find({ deletedAt: null })
        .populate('category')
        .sort({ updatedAt: -1 })
        .limit(6)
        .lean(),
      Flower.find({ deletedAt: null, isFeatured: true })
        .populate('category')
        .sort({ updatedAt: -1 })
        .limit(6)
        .lean()
    ]);

    const categoryStats = await Promise.all(
      categories.map(async (category) => ({
        ...category,
        flowerCount: await Flower.countDocuments({ deletedAt: null, category: category._id })
      }))
    );

    return res.render('admin/dashboard', {
      pageTitle: 'Tổng quan',
      stats: {
        totalFlowers,
        visibleFlowers,
        hiddenFlowers,
        outOfStockFlowers
      },
      categoryStats,
      recentFlowers,
      featuredFlowers
    });
  } catch (error) {
    return next(error);
  }
}
