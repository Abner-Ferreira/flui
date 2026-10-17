import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

/**
 * Armazenamento chave/valor para token e usuário.
 * - iOS/Android: expo-secure-store (Keychain / Keystore)
 * - Web: localStorage (o expo-secure-store não existe no navegador)
 *
 * Nota de segurança (web): localStorage é legível por qualquer script da página.
 * Para produção, o ideal é o backend emitir o token em cookie httpOnly.
 */
function webStorage(): Storage | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null
  } catch {
    return null
  }
}

export async function getItemAsync(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    return webStorage()?.getItem(key) ?? null
  }

  return SecureStore.getItemAsync(key)
}

export async function setItemAsync(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    webStorage()?.setItem(key, value)
    return
  }

  await SecureStore.setItemAsync(key, value)
}

export async function deleteItemAsync(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    webStorage()?.removeItem(key)
    return
  }

  await SecureStore.deleteItemAsync(key)
}
