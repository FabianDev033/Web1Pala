const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  } catch {
    throw new Error('No se pudo conectar con el servidor. Intenta nuevamente.');
  }

  const body = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(body.error ?? 'No se pudo completar la solicitud.');
  return body;
}
