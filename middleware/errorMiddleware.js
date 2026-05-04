export function notFoundHandler(req, res) {
  res.status(404);
  if (req.path.startsWith('/admin') && req.currentAdmin) {
    return res.render('public/not-found', {
      pageTitle: 'Không tìm thấy trang',
      message: 'Trang quản trị bạn đang tìm không tồn tại.'
    });
  }

  return res.render('public/not-found', {
    pageTitle: 'Không tìm thấy trang',
    message: 'Trang bạn đang tìm không tồn tại hoặc đã được di chuyển.'
  });
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || error.status || 500;
  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return res.status(statusCode).render('public/server-error', {
    pageTitle: 'Có lỗi xảy ra',
    message:
      statusCode === 400
        ? error.message
        : 'Hệ thống đang gặp lỗi. Vui lòng thử lại sau ít phút.',
    stack: process.env.NODE_ENV === 'production' ? null : error.stack
  });
}
