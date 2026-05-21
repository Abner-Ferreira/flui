import { SplashScreen } from '@/components/splashScreen/SplashScreen'
import { Stack } from 'expo-router'
import { useState } from 'react'
import 'react-native-reanimated'

export const unstable_settings = {
  anchor: '(tabs)',
}

export default function RootLayout() { 

   const [showSplash, setShowSplash] = useState(true)


  if (showSplash) {
      // return <SplashScreen />
    return <SplashScreen onFinish={() => setShowSplash(false)} />
  }
  
  return <Stack screenOptions={{ headerShown: false }} />
}
