import * as SecureStore from 'expo-secure-store'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export type Activity = {
  id: string
  station_id: string | null
  type: 'route' | 'charge' | 'favorite' | 'review'
  title: string
  description: string | null
}

async function getAuthHeaders() {
  const token = await SecureStore.getItemAsync('flui_token')

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

export async function getActivities() {
  const response = await fetch(`${API_URL}/activities`, {
    headers: await getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Erro ao buscar atividades')
  }

  return response.json() as Promise<Activity[]>
}

export async function createActivity(data: {
  station_id?: string
  type: Activity['type']
  title: string
  description?: string
}) {
  const response = await fetch(`${API_URL}/activities`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Erro ao criar atividade')
  }

  return response.json()
}