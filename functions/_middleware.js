export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === 'www.zerocompanytactics.com') {
    url.protocol = 'https:';
    url.hostname = 'zerocompanytactics.com';
    return Response.redirect(url, 301);
  }
  return next();
}
