import { COLORS } from '@/constants/colors'
import { registerUser } from '@/services/auth'
import { createVehicle } from '@/services/vehicles'
import { styles } from '@/styles/register'
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { useRef, useState } from 'react'
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

type VehicleCategory = 'Elétrico' | 'Híbrido'

type InputFieldProps = {
  label: string
  icon: React.ComponentProps<typeof Feather>['name']
  placeholder: string
  value: string
  onChangeText: (value: string) => void
  keyboardType?: 'default' | 'email-address' | 'phone-pad'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
}

export default function RegisterScreen() {
  const [step, setStep] = useState(1)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [vehicleModel, setVehicleModel] = useState('')
  const [category, setCategory] = useState<VehicleCategory>('Elétrico')

  const [loading, setLoading] = useState(false)
  const submittingRef = useRef(false)
  const scrollRef = useRef<ScrollView>(null)

  function scrollToTop() {
    scrollRef.current?.scrollTo({ y: 0, animated: true })
  }

  function handleNextStep() {
    if (loading || submittingRef.current) return

    if (step === 1) {
      const trimmedName = name.trim()
      const trimmedEmail = email.trim()
      const trimmedPhone = phone.trim()

      if (!trimmedName || !trimmedEmail || !trimmedPhone || !password) {
        Alert.alert(
          'Campos obrigatórios',
          'Preencha todos os seus dados pessoais.',
        )
        return
      }

      const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)

      if (!emailIsValid) {
        Alert.alert(
          'E-mail inválido',
          'Informe um endereço de e-mail válido.',
        )
        return
      }

      if (password.length < 6) {
        Alert.alert(
          'Senha muito curta',
          'Sua senha deve ter pelo menos 6 caracteres.',
        )
        return
      }

      Keyboard.dismiss()
      setStep(2)

      requestAnimationFrame(scrollToTop)
      return
    }

    if (!vehicleModel.trim()) {
      Alert.alert(
        'Veículo obrigatório',
        'Informe o modelo do seu veículo.',
      )
      return
    }

    Keyboard.dismiss()
    void handleRegister()
  }

  function handleBackStep() {
    if (loading || submittingRef.current) return

    if (step === 1) {
      router.push('/login')
      return
    }

    Keyboard.dismiss()
    setStep(1)
    requestAnimationFrame(scrollToTop)
  }

  async function handleRegister() {
    if (submittingRef.current) return

    submittingRef.current = true
    setLoading(true)

    try {
      await registerUser({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      })

      await createVehicle({
        name: vehicleModel.trim(),
        model: vehicleModel.trim(),
        year: new Date().getFullYear(),
        category,
        charger_type: 'Carga rápida',
        connector_type: 'CCS2',
      })

      router.replace('/(tabs)')
    } catch (error) {
      Alert.alert(
        'Erro ao criar conta',
        error instanceof Error
          ? error.message
          : 'Não foi possível concluir o cadastro. Tente novamente.',
      )
    } finally {
      submittingRef.current = false
      setLoading(false)
    }
  }

  return (
    <View style={localStyles.screen}>
      <ImageBackground
        source={require('@/assets/images/splash-carregando-futuro.png')}
        resizeMode="cover"
        style={styles.background}
        imageStyle={localStyles.backgroundImage}
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
          ref={scrollRef}
          style={localStyles.scroll}
          contentContainerStyle={localStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
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
                ETAPA {step} DE 2
              </Text>
            </View>

            <View style={styles.heroText}>
              <Text style={styles.title}>
                {step === 1 ? 'Crie sua conta' : 'Cadastre seu carro'}
              </Text>

              <Text style={styles.subtitle}>
                {step === 1
                  ? 'Cadastre seus dados pessoais.'
                  : 'Informe o modelo e o tipo do seu veículo.'}
              </Text>
            </View>

            <View style={styles.form}>
              {step === 1 && (
                <>
                  <InputField
                    label="Nome completo"
                    icon="user"
                    placeholder="Digite seu nome completo"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />

                  <InputField
                    label="E-mail"
                    icon="mail"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />

                  <InputField
                    label="Telefone"
                    icon="phone"
                    placeholder="(11) 99999-9999"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />

                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Senha</Text>

                    <View style={styles.inputBox}>
                      <Feather
                        name="lock"
                        size={20}
                        color={COLORS.purpleNeon}
                      />

                      <TextInput
                        placeholder="Crie sua senha"
                        placeholderTextColor="rgba(255,255,255,0.45)"
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType="newPassword"
                        autoComplete="new-password"
                        returnKeyType="done"
                        onSubmitEditing={handleNextStep}
                      />

                      <Pressable
                        onPress={() => setShowPassword(previous => !previous)}
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
                </>
              )}

              {step === 2 && (
                <>
                  <InputField
                    label="Modelo do veículo"
                    icon="truck"
                    placeholder="Ex: BYD Dolphin, Volvo EX30..."
                    value={vehicleModel}
                    onChangeText={setVehicleModel}
                    autoCapitalize="words"
                  />

                  <SelectRow
                    label="Categoria"
                    options={['Elétrico', 'Híbrido']}
                    value={category}
                    onChange={value => setCategory(value as VehicleCategory)}
                  />
                </>
              )}

              <Pressable
                style={[
                  styles.button,
                  loading && styles.buttonDisabled,
                ]}
                onPress={handleNextStep}
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
                    <Text style={styles.buttonText}>
                      {step === 1 ? 'Continuar' : 'Criar conta'}
                    </Text>
                  )}
                </LinearGradient>
              </Pressable>

              {step === 2 && (
                <Pressable
                  style={styles.footerLink}
                  onPress={handleBackStep}
                  disabled={loading}
                  accessibilityRole="button"
                >
                  <Text style={styles.footerText}>
                    Voltar etapa
                  </Text>
                </Pressable>
              )}
            </View>

            {step === 1 && (
              <Pressable
                style={styles.footerLink}
                onPress={() => router.push('/login')}
                accessibilityRole="button"
              >
                <Text style={styles.footerText}>
                  Já possui conta?{' '}
                  <Text style={styles.footerStrong}>Entrar</Text>
                </Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

function InputField({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}: InputFieldProps) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputBox}>
        <Feather
          name={icon}
          size={20}
          color={COLORS.purpleNeon}
        />

        <TextInput
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.45)"
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          returnKeyType="next"
        />
      </View>
    </View>
  )
}

function SelectRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>

      <View style={localStyles.optionsRow}>
        {options.map(option => {
          const active = value === option

          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              style={[
                localStyles.option,
                active && localStyles.optionActive,
              ]}
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
            >
              <Text
                style={[
                  localStyles.optionText,
                  active && localStyles.optionTextActive,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

const localStyles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.black,
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
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

  optionsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },

  option: {
    flex: 1,
    minWidth: 0,
    minHeight: 48,
    paddingHorizontal: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.45)',
    backgroundColor: 'rgba(14,14,14,0.84)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionActive: {
    borderColor: COLORS.greenNeon,
    backgroundColor: 'rgba(57,255,20,0.10)',
  },

  optionText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },

  optionTextActive: {
    color: COLORS.greenNeon,
  },
})
