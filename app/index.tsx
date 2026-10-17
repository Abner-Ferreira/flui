import { SplashScreen } from '@/components/splashScreen/SplashScreen'
import { router } from 'expo-router'
import * as storage from '@/services/storage'

export default function IndexScreen() {
  async function handleSplashFinish() {
    try {
      const token = await storage.getItemAsync('flui_token')

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
