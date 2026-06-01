import * as SecureStore from 'expo-secure-store'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export type Vehicle = {
  id: string
  user_id: string
  name: string
  model: string
  year: number
  category: 'Elétrico' | 'Híbrido'
  charger_type: 'Carga rápida' | 'Carga normal' | 'Ambos'
  connector_type: 'CCS2' | 'CHAdeMO' | 'Tipo 1' | 'Tipo 2'
  battery_capacity?: number | null
  autonomy_km?: number | null
}

async function getAuthHeaders() {
  const token = await SecureStore.getItemAsync('flui_token')

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

export async function getVehicles() {
  const response = await fetch(`${API_URL}/vehicles`, {
    headers: await getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Erro ao buscar veículos')
  }

  return response.json() as Promise<Vehicle[]>
}

export async function createVehicle(data: {
  name: string
  model: string
  year: number
  category: 'Elétrico' | 'Híbrido'
  charger_type: 'Carga rápida' | 'Carga normal' | 'Ambos'
  connector_type: 'CCS2' | 'CHAdeMO' | 'Tipo 1' | 'Tipo 2'
}) {
  const response = await fetch(`${API_URL}/vehicles`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Erro ao cadastrar veículo')
  }

  return response.json()
}

export async function updateVehicle(
  vehicleId: string,
  data: {
    name: string
    model: string
    year: number
    category: 'Elétrico' | 'Híbrido'
    charger_type: 'Carga rápida' | 'Carga normal' | 'Ambos'
    connector_type: 'CCS2' | 'CHAdeMO' | 'Tipo 1' | 'Tipo 2'
  }
) {
  const response = await fetch(`${API_URL}/vehicles/${vehicleId}`, {
    method: 'PUT',
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Erro ao atualizar veículo')
  }

  return response.json()
}

export async function deleteVehicle(vehicleId: string) {
  const response = await fetch(`${API_URL}/vehicles/${vehicleId}`, {
    method: 'DELETE',
    headers: await getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Erro ao remover veículo')
  }

  return response.json()
}