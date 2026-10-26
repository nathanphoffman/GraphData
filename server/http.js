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
