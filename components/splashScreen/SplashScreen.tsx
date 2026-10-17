import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

import { COLORS } from '@/constants/colors'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useState } from 'react'
import { loadingStyles, styles } from './styles'

const { width, height } = Dimensions.get('window')

type Props = {
  onFinish?: () => void
}

function EnergyParticle({
  delay,
  startX,
  color,
}: {
  delay: number
  startX: number
  color: string
}) {
  const translateY = useSharedValue(0)
  const opacity = useSharedValue(0)

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(-height * 0.35, {
          duration: 2400,
          easing: Easing.out(Easing.quad),
        }),
        -1,
        false
      )
    )

    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0, { duration: 0 }),
          withTiming(0.8, { duration: 400 }),
          withTiming(0, { duration: 1800 })
        ),
        -1,
        false
      )
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }))

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: startX,
          backgroundColor: color,
          shadowColor: color,
        },
        animatedStyle,
      ]}
    />
  )
}

function LoadingBar({ onComplete }: { onComplete: () => void }) {
  const progress = useSharedValue(0)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    progress.value = withDelay(
      800,
      withTiming(1, {
        duration: 3000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      })
    )

    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 4 + 1

      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(onComplete, 400)
      }

      setPercent(Math.floor(p))
    }, 95)

    return () => clearInterval(interval)
  }, [])

  const barStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }))

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.5, 1], [0, 1, 0.6]),
    right: 0,
  }))

  return (
    <View style={loadingStyles.container}>
      <View style={loadingStyles.labelRow}>
        <Text style={loadingStyles.label}>INICIALIZANDO</Text>
        <Text style={loadingStyles.percent}>{percent}%</Text>
      </View>

      <View style={loadingStyles.track}>
        <Animated.View style={[loadingStyles.fill, barStyle]}>
          <LinearGradient
            colors={[COLORS.purpleDeep, COLORS.purpleNeon, COLORS.greenNeon]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />

          <Animated.View style={[loadingStyles.tipGlow, glowStyle]} />
        </Animated.View>
      </View>
    </View>
  )
}

export function SplashScreen({ onFinish }: Props) {
  const bgScale = useSharedValue(1.08)
  const heroOpacity = useSharedValue(0)
  const heroY = useSharedValue(30)
  const heroScale = useSharedValue(0.92)
  const sloganOpacity = useSharedValue(0)
  const sloganY = useSharedValue(14)
  const boltGlow = useSharedValue(0)

  useEffect(() => {
    bgScale.value = withTiming(1, { duration: 4200 })

    heroOpacity.value = withDelay(250, withTiming(1, { duration: 900 }))

    heroY.value = withDelay(
      250,
      withSpring(0, {
        damping: 16,
        stiffness: 90,
      })
    )

    heroScale.value = withSequence(
      withTiming(1.03, {
        duration: 1200,
        easing: Easing.out(Easing.exp),
      }),
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1800 }),
          withTiming(1.03, { duration: 1800 })
        ),
        -1,
        true
      )
    )

    sloganOpacity.value = withDelay(700, withTiming(1, { duration: 700 }))

    sloganY.value = withDelay(
      700,
      withSpring(0, {
        damping: 18,
        stiffness: 100,
      })
    )

    boltGlow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1200 }),
        withTiming(0.45, { duration: 1200 })
      ),
      -1,
      true
    )
  }, [])

  const backgroundStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bgScale.value }],
  }))

  const heroStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [{ translateY: heroY.value }, { scale: heroScale.value }],
  }))

  const sloganStyle = useAnimatedStyle(() => ({
    opacity: sloganOpacity.value,
    transform: [{ translateY: sloganY.value }],
  }))

  const boltStyle = useAnimatedStyle(() => ({
    opacity: interpolate(boltGlow.value, [0, 1], [0.9, 1]),
    transform: [
      {
        scale: interpolate(boltGlow.value, [0, 1], [1, 1.03]),
      },
    ],
  }))

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.backgroundContainer, backgroundStyle]}>
        <ImageBackground
          source={require('@/assets/images/splash-carregando-futuro.png')}
          resizeMode='cover'
          style={styles.background}
        >
          <LinearGradient
            colors={[
              'rgba(0,0,0,0.58)',
              'rgba(0,0,0,0.15)',
              'rgba(0,0,0,0.72)',
            ]}
            locations={[0, 0.45, 1]}
            style={StyleSheet.absoluteFill}
          />

          <EnergyParticle
            delay={0}
            startX={width * 0.6}
            color={COLORS.greenNeon}
          />

          <EnergyParticle
            delay={700}
            startX={width * 0.66}
            color={COLORS.purpleNeon}
          />

          <View style={styles.content}>
            <Animated.View style={[styles.heroContainer, heroStyle]}>
              <Animated.Image
                source={require('@/assets/images/flui-bolt.png')}
                style={[styles.heroBolt, boltStyle]}
                fadeDuration={0}
              />

              <Text style={styles.heroTitle}>FLUI</Text>

              <Animated.View style={sloganStyle}>
                <Text style={styles.heroSubtitle}>
                  Carregando o futuro,{'\n'}
                  <Text style={styles.heroHighlight}>conectando você.</Text>
                </Text>
              </Animated.View>
            </Animated.View>
          </View>

          <View style={styles.bottom}>
            <LoadingBar onComplete={() => onFinish?.()} />
          </View>
        </ImageBackground>
      </Animated.View>
    </View>
  )
}
