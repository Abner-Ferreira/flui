import { COLORS } from '@/constants/colors'
import { loginUser } from '@/services/auth'
import { styles } from '@/styles/login'
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { Alert } from '@/lib/alert'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    if (!email.trim() || !password) {
      Alert.alert('Atenção', 'Preencha seu e-mail e sua senha.')
      return
    }

    try {
      setLoading(true)

      await loginUser({
        email: email.trim(),
        password,
      })

      Keyboard.dismiss()
      router.replace('/(tabs)')
    } catch (error) {
      Alert.alert(
        'Erro ao entrar',
        error instanceof Error ? error.message : 'Tente novamente.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={localStyles.screen}>
      <ImageBackground
        source={require('@/assets/images/splash-carregando-futuro.png')}
        resizeMode="cover"
        style={styles.background}
      >
        <View
          pointerEvents="none"
          style={localStyles.gradientLayer}
        >
          <LinearGradient
            colors={[
              'rgba(0,0,0,0.15)',
              'rgba(0,0,0,0.55)',
              'rgba(0,0,0,0.96)',
            ]}
            locations={[0, 0.35, 1]}
            style={StyleSheet.absoluteFill}
          />
        </View>

        <ScrollView
          style={localStyles.scroll}
          contentContainerStyle={localStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={
            Platform.OS === 'ios' ? 'interactive' : 'on-drag'
          }
          showsVerticalScrollIndicator={Platform.OS === 'web'}
          automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
        >
          <View style={styles.content}>
            <View style={styles.brandArea}>
              <Image
                source={require('@/assets/images/flui-bolt.png')}
                style={styles.bolt}
                resizeMode="contain"
              />

              <Text style={styles.logo}>FLUI</Text>
              <Text style={styles.logoSubtitle}>
                MOBILIDADE ELÉTRICA
              </Text>
            </View>

            <View style={styles.heroText}>
              <Text style={styles.title}>
                Bem-vindo(a) de volta!
              </Text>

              <Text style={styles.subtitle}>
                Acesse sua conta e continue sua jornada elétrica.
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>E-mail</Text>

                <View style={styles.inputBox}>
                  <Feather
                    name="mail"
                    size={20}
                    color={COLORS.purpleNeon}
                  />

                  <TextInput
                    placeholder="Digite seu e-mail"
                    placeholderTextColor="rgba(255,255,255,0.45)"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoComplete="email"
                    returnKeyType="next"
                  />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Senha</Text>

                <View style={styles.inputBox}>
                  <Feather
                    name="lock"
                    size={20}
                    color={COLORS.purpleNeon}
                  />

                  <TextInput
                    placeholder="Digite sua senha"
                    placeholderTextColor="rgba(255,255,255,0.45)"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    textContentType="password"
                    autoComplete="current-password"
                    autoCapitalize="none"
                    returnKeyType="done"
                    onSubmitEditing={handleLogin}
                  />

                  <Pressable
                    onPress={() =>
                      setShowPassword(previous => !previous)
                    }
                    accessibilityRole="button"
                    accessibilityLabel={
                      showPassword ? 'Ocultar senha' : 'Mostrar senha'
                    }
                    hitSlop={10}
                  >
                    <Feather
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="rgba(255,255,255,0.7)"
                    />
                  </Pressable>
                </View>
              </View>

              <Pressable
                style={styles.forgotButton}
                onPress={() =>
                  Alert.alert(
                    'Recuperar senha',
                    'Entre em contato com o suporte para recuperar sua senha.',
                  )
                }
                accessibilityRole="button"
              >
                <Text style={styles.forgotText}>
                  Esqueci minha senha
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.button,
                  loading && styles.buttonDisabled,
                ]}
                onPress={handleLogin}
                disabled={loading}
                accessibilityRole="button"
              >
                <LinearGradient
                  colors={[
                    COLORS.purpleDeep,
                    COLORS.purpleNeon,
                    '#D600FF',
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  {loading ? (
                    <ActivityIndicator color={COLORS.white} />
                  ) : (
                    <Text style={styles.buttonText}>Entrar</Text>
                  )}
                </LinearGradient>
              </Pressable>
            </View>

            <Pressable
              style={styles.footerLink}
              onPress={() => router.push('/register')}
              accessibilityRole="button"
            >
              <Text style={styles.footerText}>
                Ainda não possui conta?{' '}
                <Text style={styles.footerStrong}>
                  Criar conta
                </Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

const localStyles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.black,
  },

  gradientLayer: {
    ...StyleSheet.absoluteFill,
    zIndex: 0,
  },

  scroll: {
    flex: 1,
    width: '100%',
    zIndex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    width: '100%',
  },
})