import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { db } from "./db.js";
import { HttpError, getCookie, readJson, sendJson, sessionCookie } from "./http.js";

const SESSION_SECONDS = 30 * 24 * 60 * 60;
const MAX_FAILURES = 10;
const FAILURE_WINDOW_MS = 15 * 60 * 1000;

db.exec(`
  CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password_hash TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, username TEXT NOT NULL, expires_at INTEGER NOT NULL);
`);

const sha256 = (text) => createHash("sha256").update(text).digest("hex");

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");

  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

function passwordMatches(password, stored) {
  const [salt, hash] = stored.split(":");
  const expected = Buffer.from(hash, "hex");

  return timingSafeEqual(scryptSync(password, salt, expected.length), expected);
}

/**
 * Create or update the login from ADMIN_USERNAME and ADMIN_PASSWORD, so the password lives in an environment
 * variable and only its hash is stored. Without them, local development gets admin/admin and production gets no login.
 */
function ensureAdmin() {
  const dev = process.env.NODE_ENV !== "production";
  const username = process.env.ADMIN_USERNAME ?? (dev ? "admin" : undefined);
  const password = process.env.ADMIN_PASSWORD ?? (dev ? "admin" : undefined);

  if (!username || !password) {
    console.warn("ADMIN_USERNAME and ADMIN_PASSWORD are not set, so nobody can log in.");
    return;
  }

  db.prepare("INSERT OR REPLACE INTO users (username, password_hash) VALUES (?, ?)").run(username, hashPassword(password));
}

ensureAdmin();

// Failed logins in the current window; after too many, logging in is refused until it passes.
let failures = { count: 0, since: Date.now() };

function checkLoginAllowed() {
  if (Date.now() - failures.since > FAILURE_WINDOW_MS) failures = { count: 0, since: Date.now() };
  if (failures.count >= MAX_FAILURES) throw new HttpError(429, "Too many failed logins, try again later");
}

/** The username for the request's session cookie, or null when not logged in. */
export function currentUser(request) {
  const token = getCookie(request, "session");
  if (!token) return null;

  const session = db.prepare("SELECT username, expires_at FROM sessions WHERE token_hash = ?").get(sha256(token));
  if (!session || session.expires_at < Date.now()) return null;

  return session.username;
}

/** Throws a 401 unless the request is logged in; returns the username. */
export function requireUser(request) {
  const username = currentUser(request);
  if (!username) throw new HttpError(401, "Log in to do that");

  return username;
}

/** Routes for logging in and out; any feature can use `requireUser` to protect its own routes. */
export const authRoutes = [
  {
    method: "GET",
    path: "/api/me",
    handler: (request, response) => sendJson(response, 200, { username: currentUser(request) }),
  },
  {
    method: "POST",
    path: "/api/login",
    handler: async (request, response) => {
      checkLoginAllowed();
      const { username, password } = await readJson(request);
      const user = typeof username === "string" ? db.prepare("SELECT password_hash FROM users WHERE username = ?").get(username) : undefined;

      if (!user || typeof password !== "string" || !passwordMatches(password, user.password_hash)) {
        failures.count++;
        throw new HttpError(401, "Wrong username or password");
      }

      const token = randomBytes(32).toString("hex");
      db.prepare("DELETE FROM sessions WHERE expires_at < ?").run(Date.now());
      db.prepare("INSERT INTO sessions (token_hash, username, expires_at) VALUES (?, ?, ?)").run(sha256(token), username, Date.now() + SESSION_SECONDS * 1000);
      sendJson(response, 200, { username }, { "Set-Cookie": sessionCookie(request, token, SESSION_SECONDS) });
    },
  },
  {
    method: "POST",
    path: "/api/logout",
    handler: (request, response) => {
      const token = getCookie(request, "session");
      if (token) db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(sha256(token));
      sendJson(response, 200, { username: null }, { "Set-Cookie": sessionCookie(request, "", 0) });
    },
  },
];
