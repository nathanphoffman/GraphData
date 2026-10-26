/** Every page talks to the server through this, so a failure always arrives as one Error carrying the server's message and no caller has to check the response itself. */
export async function callApi<T>(path: string, method = "GET", body?: unknown): Promise<T> {
  const response = await fetch(path, {
    method,
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) throw new Error(data.error ?? `HTTP ${response.status}`);

  return data as T;
}
