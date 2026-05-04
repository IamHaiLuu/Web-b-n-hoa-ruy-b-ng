import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const PLACEHOLDER_VALUES = new Set([
  'your_cloud_name',
  'your_api_key',
  'your_api_secret'
]);

function cleanEnv(value) {
  return String(value || '').trim();
}

export function getCloudinaryConfig() {
  return {
    cloudName: cleanEnv(process.env.CLOUDINARY_CLOUD_NAME),
    apiKey: cleanEnv(process.env.CLOUDINARY_API_KEY),
    apiSecret: cleanEnv(process.env.CLOUDINARY_API_SECRET)
  };
}

export function hasCloudinaryConfig() {
  const config = getCloudinaryConfig();
  return Object.values(config).every((value) => value && !PLACEHOLDER_VALUES.has(value));
}

export function configureCloudinary() {
  if (!hasCloudinaryConfig()) {
    return false;
  }

  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
  });

  return true;
}

configureCloudinary();

export default cloudinary;
