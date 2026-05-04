import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String
  },
  { _id: false }
);

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      default: '',
      maxlength: 300
    },
    icon: {
      type: String,
      default: 'local_florist',
      maxlength: 32
    },
    image: imageSchema,
    isVisible: {
      type: Boolean,
      default: true
    },
    sortOrder: {
      type: Number,
      default: 0
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

categorySchema.index({ deletedAt: 1, isVisible: 1, sortOrder: 1 });

export default mongoose.model('Category', categorySchema);
