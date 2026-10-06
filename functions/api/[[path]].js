// Cloudflare Pages Function: proxies <spa-origin>/api/* to the AWS HTTP API Gateway on the same
// origin as the SPA, so the browser never makes a cross-origin call (no CORS, backend hidden).
//
// Requires project env vars BACKEND_URL and PROXY_SECRET (set by Terraform on the Pages project).
export async function onRequest(context) {
  const { request, env } = context;

  const incoming = new URL(request.url);
  const target = new URL(env.BACKEND_URL);
  target.pathname = incoming.pathname; // e.g. /api/health
  target.search = incoming.search;

  const headers = new Headers(request.headers);
  headers.set("x-proxy-secret", env.PROXY_SECRET);
  headers.delete("host");

  const init = { method: request.method, headers };
  if (!["GET", "HEAD"].includes(request.method)) {
    init.body = request.body;
    init.duplex = "half";
  }

  return fetch(target.toString(), init);
}
