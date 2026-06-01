import { COLORS } from '@/constants/colors'
import { loginUser } from '@/services/auth'
import { styles } from '@/styles/login'
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    try {
      setLoading(true)

      await loginUser({
        email,
        password,
      })

      router.replace('/(tabs)')
    } catch (error) {
      Alert.alert(
        'Erro ao entrar',
        error instanceof Error ? error.message : 'Tente novamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <ImageBackground
      source={require('@/assets/images/splash-carregando-futuro.png')}
      resizeMode='cover'
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.55)', 'rgba(0,0,0,0.96)']}
        locations={[0, 0.35, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        extraScrollHeight={30}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.content}>
          <View style={styles.brandArea}>
            <Image
              source={require('@/assets/images/flui-bolt.png')}
              style={styles.bolt}
              resizeMode='contain'
            />

            <Text style={styles.logo}>FLUI</Text>

            <Text style={styles.logoSubtitle}>MOBILIDADE ELÉTRICA</Text>
          </View>

          <View style={styles.heroText}>
            <Text style={styles.title}>Bem-vindo(a) de volta!</Text>

            <Text style={styles.subtitle}>
              Acesse sua conta e continue sua jornada elétrica.
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>E-mail</Text>

              <View style={styles.inputBox}>
                <Feather name='mail' size={20} color={COLORS.purpleNeon} />

                <TextInput
                  placeholder='Digite seu e-mail'
                  placeholderTextColor='rgba(255,255,255,0.45)'
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize='none'
                  keyboardType='email-address'
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Senha</Text>

              <View style={styles.inputBox}>
                <Feather name='lock' size={20} color={COLORS.purpleNeon} />

                <TextInput
                  placeholder='Digite sua senha'
                  placeholderTextColor='rgba(255,255,255,0.45)'
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />

                <Pressable onPress={() => setShowPassword(prev => !prev)}>
                  <Feather
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color='rgba(255,255,255,0.7)'
                  />
                </Pressable>
              </View>
            </View>

            <Pressable style={styles.forgotButton}>
              <Text style={styles.forgotText}>Esqueci minha senha</Text>
            </Pressable>

            <Pressable
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <LinearGradient
                colors={[COLORS.purpleDeep, COLORS.purpleNeon, '#D600FF']}
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
          >
            <Text style={styles.footerText}>
              Ainda não possui conta?{' '}
              <Text style={styles.footerStrong}>Criar conta</Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  )
}
