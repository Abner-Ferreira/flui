import { SplashScreen } from '@/components/splashScreen/SplashScreen'
import { router } from 'expo-router'

export default function IndexScreen() {
  function handleSplashFinish() {
    router.replace('/login')
  }

  return <SplashScreen onFinish={handleSplashFinish} />
}