import mongoose from 'mongoose';

const flowerImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    publicId: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    },
    sortOrder: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const flowerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    referencePrice: {
      type: Number,
      required: true,
      min: 0
    },
    shortDescription: {
      type: String,
      default: '',
      maxlength: 160
    },
    description: {
      type: String,
      default: ''
    },
    suitableOccasions: [String],
    mainColors: [String],
    sizeNote: {
      type: String,
      default: ''
    },
    tags: [String],
    internalNote: {
      type: String,
      default: ''
    },
    images: [flowerImageSchema],
    availabilityStatus: {
      type: String,
      enum: ['available', 'out_of_stock'],
      default: 'available'
    },
    visibilityStatus: {
      type: String,
      enum: ['visible', 'hidden'],
      default: 'visible'
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date,
      default: null
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    }
  },
  { timestamps: true }
);

flowerSchema.index({ deletedAt: 1, visibilityStatus: 1, updatedAt: -1 });
flowerSchema.index({ name: 'text', shortDescription: 'text', tags: 'text' });

export default mongoose.model('Flower', flowerSchema);
