export function getPagination(page = 1, limit = 12, totalItems = 0) {
  const currentPage = Math.max(Number(page) || 1, 1);
  const totalPages = Math.max(Math.ceil(totalItems / limit), 1);
  return {
    page: Math.min(currentPage, totalPages),
    limit,
    totalItems,
    totalPages,
    skip: (Math.min(currentPage, totalPages) - 1) * limit,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages
  };
}

export function buildPageUrl(path, query = {}, page = 1) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (key === 'page' || value === undefined || value === null || value === '') {
      return;
    }
    params.set(key, value);
  });
  params.set('page', page);

  return `${path}?${params.toString()}`;
}
