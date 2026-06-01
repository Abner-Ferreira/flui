const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`)

  if (!response.ok) {
    throw new Error('Erro ao buscar dados da API')
  }

  return response.json()
}