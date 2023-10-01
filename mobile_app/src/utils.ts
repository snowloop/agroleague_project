export function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw Error(`${response.status}: ${response.statusText}`);
  }
  return response.json();
}
