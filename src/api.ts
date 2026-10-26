/** Call the API with an optional JSON body; throws an Error with the server's message when the call fails. */
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
