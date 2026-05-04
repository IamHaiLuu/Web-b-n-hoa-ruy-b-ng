export function escapeRegex(value = '') {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function priceRangeFilter(priceRange) {
  switch (priceRange) {
    case 'under-300':
      return { $lt: 300000 };
    case '300-500':
      return { $gte: 300000, $lte: 500000 };
    case '500-1000':
      return { $gte: 500000, $lte: 1000000 };
    case 'over-1000':
      return { $gt: 1000000 };
    default:
      return null;
  }
}

export function adminSort(sort) {
  switch (sort) {
    case 'price_asc':
      return { referencePrice: 1 };
    case 'price_desc':
      return { referencePrice: -1 };
    case 'name_asc':
      return { name: 1 };
    default:
      return { updatedAt: -1 };
  }
}
