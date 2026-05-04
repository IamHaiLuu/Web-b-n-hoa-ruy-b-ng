import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

export function configureSecurity(app) {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com'],
          connectSrc: ["'self'"],
          formAction: ["'self'"],
          frameAncestors: ["'self'"]
        }
      }
    })
  );
}

export function sanitizeInput(app) {
  app.use(mongoSanitize({ replaceWith: '_' }));
}
