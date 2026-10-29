import { createServer } from "node:http";
import sirv from "sirv";
import { authRoutes } from "./auth.js";
import { boardGameRoutes } from "./board-games.js";
import { HttpError, sendJson } from "./http.js";
import { rankingRoutes } from "./rankings.js";
import { weightRoutes } from "./weights.js";

const PORT = process.env.PORT ?? 3000;
const serveSite = sirv("dist", { single: true });

// To add a feature, give it a routes file like weights.js and list it here. Protect a route with `requireUser(request)`.
const routes = [...authRoutes, ...weightRoutes, ...rankingRoutes, ...boardGameRoutes].map((route) => ({
  ...route,
  pattern: new RegExp(`^${route.path.replace(/:(\w+)/g, "(?<$1>[^/]+)")}$`),
}));

/** Run the matching API route, or return false when the URL is not an API route. */
async function handleApi(request, response) {
  const { pathname } = new URL(request.url, "http://localhost");
  if (!pathname.startsWith("/api/")) return false;

  const matches = routes.map((route) => ({ route, match: route.pattern.exec(pathname) })).filter(({ match }) => match);
  const found = matches.find(({ route }) => route.method === request.method);

  if (!found) {
    sendJson(response, matches.length ? 405 : 404, { error: matches.length ? "Method not allowed" : "Not found" });
    return true;
  }

  try {
    // Names like "HTML/CSS" travel URL-encoded in the path.
    const params = Object.fromEntries(Object.entries(found.match.groups ?? {}).map(([key, value]) => [key, decodeURIComponent(value)]));
    await found.route.handler(request, response, params);
  } catch (error) {
    if (!(error instanceof HttpError)) console.error(error);
    sendJson(response, error instanceof HttpError ? error.status : 500, { error: error instanceof HttpError ? error.message : "Server error" });
  }

  return true;
}

createServer(async (request, response) => {
  if (!(await handleApi(request, response))) serveSite(request, response);
}).listen(PORT, "0.0.0.0", () => console.log(`Listening on port ${PORT}`));
