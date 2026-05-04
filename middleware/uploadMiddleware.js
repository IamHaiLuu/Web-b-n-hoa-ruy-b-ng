import multer from 'multer';

const storage = multer.memoryStorage();
const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function fileFilter(req, file, cb) {
  if (!allowedTypes.includes(file.mimetype)) {
    cb(new Error('Chỉ hỗ trợ file ảnh JPG, PNG, WEBP hoặc GIF.'));
    return;
  }
  cb(null, true);
}

export const uploadFlowerImages = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 12
  }
}).array('images', 12);

export const uploadSettingsImages = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 2
  }
}).fields([
  { name: 'logo', maxCount: 1 },
  { name: 'banner', maxCount: 1 }
]);
