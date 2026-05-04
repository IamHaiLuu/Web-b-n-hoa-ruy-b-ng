export function generateSlug(text = '') {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-') || 'item';
}

export async function createUniqueSlug(Model, text, currentId = null) {
  const baseSlug = generateSlug(text);
  let slug = baseSlug;
  let suffix = 2;

  while (true) {
    const query = { slug };
    if (currentId) {
      query._id = { $ne: currentId };
    }

    const existing = await Model.exists(query);
    if (!existing) {
      return slug;
    }

    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}
