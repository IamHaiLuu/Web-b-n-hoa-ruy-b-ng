import cloudinary, { hasCloudinaryConfig } from '../config/cloudinary.js';

export const UPLOAD_FOLDERS = Object.freeze({
  root: 'menu-hoa',
  flowers: 'menu-hoa/flowers',
  settings: 'menu-hoa/settings'
});

export function ensureCloudinaryReady() {
  if (!hasCloudinaryConfig()) {
    const error = new Error('Cloudinary chưa được cấu hình. Vui lòng kiểm tra biến môi trường Cloudinary.');
    error.statusCode = 400;
    throw error;
  }
}

export function uploadBuffer(file, folder = UPLOAD_FOLDERS.root) {
  ensureCloudinaryReady();

  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }]
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id
        });
      }
    );

    upload.end(file.buffer);
  });
}

export async function uploadMany(files = [], folder) {
  const uploaded = [];
  for (const file of files) {
    uploaded.push(await uploadBuffer(file, folder));
  }
  return uploaded;
}

export async function deleteAsset(publicId) {
  if (!publicId || !hasCloudinaryConfig()) {
    return;
  }
  await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
}

export async function deleteManyAssets(publicIds = []) {
  const cleanPublicIds = publicIds.filter(Boolean);
  for (const publicId of cleanPublicIds) {
    await deleteAsset(publicId);
  }
}
