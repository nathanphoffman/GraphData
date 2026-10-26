const MAX_BODY_BYTES = 10_000;

/** An error that becomes an HTTP response with this status and message. */
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

/** Send a JSON response. */
export function sendJson(response, status, body, headers = {}) {
  response.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers });
  response.end(JSON.stringify(body));
}

/** Read the request body as JSON ({} when empty). */
export async function readJson(request) {
  let text = "";
  for await (const chunk of request) {
    text += chunk;
    if (text.length > MAX_BODY_BYTES) throw new HttpError(413, "Request too large");
  }
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new HttpError(400, "Body must be valid JSON");
  }
}

/**
 * When a row was last changed, in milliseconds since 1970. Normal edits leave it out and get the current time; the sync script
 * sends the time from the copy it is bringing over, so a synced row keeps its age and is not mistaken for a new edit.
 */
export function readStamp(value) {
  if (value === undefined) return Date.now();
  if (!Number.isInteger(value) || value < 0 || value > Date.now() + 24 * 60 * 60 * 1000) throw new HttpError(400, "updatedAt must be a time in milliseconds");

  return value;
}

/** Value of one cookie from the request, or undefined. */
export function getCookie(request, name) {
  const pair = (request.headers.cookie ?? "").split(";").map((part) => part.trim().split("=")).find(([key]) => key === name);

  return pair?.[1];
}

/** Set-Cookie header value for the session cookie; an empty value with maxAge 0 clears it. */
export function sessionCookie(request, value, maxAgeSeconds) {
  const secure = request.headers["x-forwarded-proto"] === "https" ? "; Secure" : "";

  return `session=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAgeSeconds}${secure}`;
}
