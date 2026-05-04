export const FLOWER_PLACEHOLDER = '/images/placeholders/flower-placeholder.svg';

export function getPrimaryImage(flower) {
  if (!flower?.images?.length) {
    return null;
  }
  return (
    flower.images.find((image) => image.isPrimary) ||
    [...flower.images].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))[0]
  );
}

export function getPrimaryImageUrl(flower) {
  return getPrimaryImage(flower)?.url || FLOWER_PLACEHOLDER;
}

export function normalizeList(value) {
  if (!value) {
    return [];
  }

  const raw = Array.isArray(value) ? value.flat() : String(value).split(',');
  return raw
    .map((item) => String(item).trim())
    .filter(Boolean)
    .slice(0, 20);
}

export function phoneUrl(phone = '') {
  const cleaned = String(phone).replace(/[^\d+]/g, '');
  return cleaned ? `tel:${cleaned}` : '#';
}

export function getZaloUrl(zalo = '') {
  const cleaned = String(zalo).replace(/[^\d]/g, '');
  return cleaned ? `https://zalo.me/${cleaned}` : '#';
}

export function normalizeImages(images = []) {
  if (!images.length) {
    return [];
  }

  const sorted = [...images].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  const hasPrimary = sorted.some((image) => image.isPrimary);
  return sorted.map((image, index) => ({
    url: image.url,
    publicId: image.publicId,
    alt: image.alt || '',
    sortOrder: index,
    isPrimary: hasPrimary ? Boolean(image.isPrimary) : index === 0
  }));
}
