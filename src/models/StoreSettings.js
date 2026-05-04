import mongoose from 'mongoose';

const settingsImageSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String
  },
  { _id: false }
);

const storeSettingsSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
      default: 'Menu Hoa',
      trim: true
    },
    phone: {
      type: String,
      default: ''
    },
    zalo: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    openingHours: {
      type: String,
      default: '08:00 - 20:00, Thứ 2 - Chủ nhật'
    },
    googleMapsUrl: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: 'Menu hoa tươi mỗi ngày với phong cách pastel nhẹ nhàng.',
      maxlength: 500
    },
    logo: settingsImageSchema,
    banner: settingsImageSchema
  },
  { timestamps: true }
);

storeSettingsSchema.statics.getSingleton = async function getSingleton() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({
      storeName: process.env.STORE_NAME || 'Menu Hoa',
      phone: process.env.STORE_PHONE || '',
      zalo: process.env.STORE_ZALO || '',
      address: process.env.STORE_ADDRESS || '',
      googleMapsUrl: process.env.STORE_GOOGLE_MAPS_URL || ''
    });
  }
  return settings;
};

export default mongoose.model('StoreSettings', storeSettingsSchema);
