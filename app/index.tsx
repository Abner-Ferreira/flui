import { SplashScreen } from '@/components/splashScreen/SplashScreen'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

export default function IndexScreen() {
  async function handleSplashFinish() {
    try {
      const token = await SecureStore.getItemAsync('flui_token')
      const user = await SecureStore.getItemAsync('flui_user')

      console.log('TOKEN:', token)
      console.log('USER:', user)

      if (token) {
        router.replace('/(tabs)')
        return
      }

      router.replace('/login')
    } catch {
      router.replace('/login')
    }
  }

  return <SplashScreen onFinish={handleSplashFinish} />
}
