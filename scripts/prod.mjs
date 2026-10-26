// Logs in to the live site with PROD_URL, PROD_USERNAME and PROD_PASSWORD (just reads them from .env) and returns a function to call its API.
export async function connectToProd() {
  const { PROD_URL, PROD_USERNAME, PROD_PASSWORD } = process.env;
  if (!PROD_URL || !PROD_USERNAME || !PROD_PASSWORD) {
    console.error("Set PROD_URL, PROD_USERNAME and PROD_PASSWORD first.");
    process.exit(1);
  }

  const base = PROD_URL.replace(/\/+$/, "");
  let cookie = "";

  /** Call the live site's API; throws with the server's message when it says no. */
  async function call(method, path, body) {
    const response = await fetch(base + path, {
      method,
      headers: { "Content-Type": "application/json", ...(cookie && { Cookie: cookie }) },
      body: body && JSON.stringify(body),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error ?? data.message ?? `${response.status} ${response.statusText}`);

    return { data, response };
  }

  const { response: login } = await call("POST", "/api/login", { username: PROD_USERNAME, password: PROD_PASSWORD });
  cookie = login.headers.get("set-cookie").split(";")[0];

  return call;
}
