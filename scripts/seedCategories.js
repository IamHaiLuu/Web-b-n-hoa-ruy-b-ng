import dotenv from 'dotenv';
import { connectDB, disconnectDB } from '../src/config/db.js';
import Category from '../src/models/Category.js';
import { createUniqueSlug } from '../src/services/slugService.js';

dotenv.config();

const categories = [
  { name: 'Hoa sinh nhật', icon: 'cake', sortOrder: 10 },
  { name: 'Hoa cưới', icon: 'favorite', sortOrder: 20 },
  { name: 'Hoa khai trương', icon: 'storefront', sortOrder: 30 },
  { name: 'Hoa chia buồn', icon: 'spa', sortOrder: 40 },
  { name: 'Bó hoa tươi', icon: 'local_florist', sortOrder: 50 },
  { name: 'Giỏ hoa', icon: 'redeem', sortOrder: 60 },
  { name: 'Hoa theo mùa', icon: 'eco', sortOrder: 70 },
  { name: 'Hoa sáp', icon: 'diamond', sortOrder: 80 },
  { name: 'Set quà tặng', icon: 'card_giftcard', sortOrder: 90 }
];

async function seedCategories() {
  await connectDB();

  for (const item of categories) {
    const existing = await Category.findOne({ name: item.name, deletedAt: null });
    if (existing) {
      existing.set({ ...item, isVisible: true });
      await existing.save();
      continue;
    }

    await Category.create({
      ...item,
      slug: await createUniqueSlug(Category, item.name),
      description: '',
      isVisible: true
    });
  }

  console.log(`Seeded ${categories.length} categories`);
  await disconnectDB();
}

seedCategories().catch(async (error) => {
  console.error(error);
  await disconnectDB();
  process.exit(1);
});
