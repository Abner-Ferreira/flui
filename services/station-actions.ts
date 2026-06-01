import * as SecureStore from 'expo-secure-store'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export type FavoriteStation = {
  id: string
  station_id: string
}

export type StationReview = {
  id: string
  user_id: string
  station_id: string
  rating: number
  comment: string | null
}

async function getAuthHeaders() {
  const token = await SecureStore.getItemAsync('flui_token')

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

async function parseResponse(response: Response) {
  const text = await response.text()

  try {
    return JSON.parse(text)
  } catch {
    return {
      detail: text || 'Erro inesperado na API',
    }
  }
}

export async function favoriteStation(stationId: string) {
  const response = await fetch(`${API_URL}/stations/${stationId}/favorite`, {
    method: 'POST',
    headers: await getAuthHeaders(),
  })

  const result = await parseResponse(response)

  if (!response.ok) {
    throw new Error(result.detail || 'Erro ao favoritar posto')
  }

  return result
}

export async function unfavoriteStation(stationId: string) {
  const response = await fetch(`${API_URL}/stations/${stationId}/favorite`, {
    method: 'DELETE',
    headers: await getAuthHeaders(),
  })

  const result = await parseResponse(response)

  if (!response.ok) {
    throw new Error(result.detail || 'Erro ao remover favorito')
  }

  return result
}

export async function getFavorites() {
  const response = await fetch(`${API_URL}/favorites`, {
    headers: await getAuthHeaders(),
  })

  const result = await parseResponse(response)

  if (!response.ok) {
    throw new Error(result.detail || 'Erro ao buscar favoritos')
  }

  return result as FavoriteStation[]
}

export async function getStationReviews(stationId: string) {
  const response = await fetch(`${API_URL}/stations/${stationId}/reviews`)

  const result = await parseResponse(response)

  if (!response.ok) {
    throw new Error(result.detail || 'Erro ao buscar avaliações')
  }

  return result as StationReview[]
}

export async function reviewStation(data: {
  stationId: string
  rating: number
  comment?: string
}) {
  const response = await fetch(`${API_URL}/stations/${data.stationId}/reviews`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify({
      rating: data.rating,
      comment: data.comment,
    }),
  })

  const result = await parseResponse(response)

  if (!response.ok) {
    throw new Error(result.detail || 'Erro ao avaliar posto')
  }

  return result as StationReview
}