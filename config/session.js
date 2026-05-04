export function sessionOptions() {
  return {
    name: 'menuhoa.sid',
    secret: process.env.SESSION_SECRET || 'development_session_secret_change_me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 8
    }
  };
}
