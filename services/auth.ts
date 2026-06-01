import * as SecureStore from 'expo-secure-store'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export type User = {
  id: string
  name: string
  email: string
  phone: string
  role: 'DRIVER'
}

type AuthResponse = {
  token: string
  user: User
}

type UpdateUserData = {
  name: string
  email: string
  phone: string
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

async function getAuthHeaders() {
  const token = await SecureStore.getItemAsync('flui_token')

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

export async function registerUser(data: {
  name: string
  email: string
  phone: string
  password: string
}) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await parseResponse(response)

  if (!response.ok) {
    throw new Error(result.detail || 'Erro ao criar conta')
  }

  await SecureStore.setItemAsync('flui_token', result.token)
  await SecureStore.setItemAsync('flui_user', JSON.stringify(result.user))

  return result as AuthResponse
}

export async function loginUser(data: {
  email: string
  password: string
}) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await parseResponse(response)

  if (!response.ok) {
    throw new Error(result.detail || 'Erro ao fazer login')
  }

  await SecureStore.setItemAsync('flui_token', result.token)
  await SecureStore.setItemAsync('flui_user', JSON.stringify(result.user))

  return result as AuthResponse
}

export async function getLoggedUser() {
  const storedUser = await SecureStore.getItemAsync('flui_user')

  if (!storedUser) {
    return null
  }

  return JSON.parse(storedUser) as User
}

export async function updateLoggedUser(data: UpdateUserData) {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: 'PUT',
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  })

  const result = await parseResponse(response)

  if (!response.ok) {
    throw new Error(result.detail || 'Erro ao atualizar perfil')
  }

  await SecureStore.setItemAsync('flui_user', JSON.stringify(result))

  return result as User
}

export async function logoutUser() {
  await SecureStore.deleteItemAsync('flui_token')
  await SecureStore.deleteItemAsync('flui_user')
}