export function flashMiddleware(req, res, next) {
  req.session.flash = req.session.flash || {};

  req.flash = function flash(type, message) {
    if (!type) {
      const messages = req.session.flash || {};
      req.session.flash = {};
      return messages;
    }

    if (message === undefined) {
      const messages = req.session.flash[type] || [];
      delete req.session.flash[type];
      return messages;
    }

    req.session.flash[type] = req.session.flash[type] || [];
    req.session.flash[type].push(message);
    return req.session.flash[type];
  };

  next();
}
