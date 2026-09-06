import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  // Normalisiert sowohl den Base-Pfad-präfigierten Request (via nginx,
  // z.B. /wissens-dashboard/admin) als auch einen direkten Zugriff auf den
  // Node-Prozess ohne Präfix (z.B. /admin) auf denselben relativen Pfad,
  // damit die Auth-Prüfung nicht durch Umgehen des Präfixes umgangen werden kann.
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const relativePath = pathname === base
    ? '/'
    : pathname.startsWith(`${base}/`)
      ? pathname.slice(base.length)
      : pathname;

  const isProtected = relativePath.startsWith('/admin') || relativePath.startsWith('/api/admin');

  if (!isProtected) return next();

  const user = import.meta.env.ADMIN_USER;
  const pass = import.meta.env.ADMIN_PASSWORD;

  if (!user || !pass) {
    return new Response(
      'Admin-Zugang ist nicht konfiguriert (ADMIN_USER/ADMIN_PASSWORD in .env setzen).',
      { status: 500 },
    );
  }

  const authHeader = context.request.headers.get('authorization');
  if (authHeader?.startsWith('Basic ')) {
    const decoded = Buffer.from(authHeader.slice(6), 'base64').toString('utf-8');
    const separatorIndex = decoded.indexOf(':');
    const providedUser = decoded.slice(0, separatorIndex);
    const providedPass = decoded.slice(separatorIndex + 1);

    if (providedUser === user && providedPass === pass) {
      return next();
    }
  }

  return new Response('Authentifizierung erforderlich.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Admin-Bereich"' },
  });
});
