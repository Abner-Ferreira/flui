import { COLORS } from '@/constants/colors'
import { registerUser } from '@/services/auth'
import { createVehicle } from '@/services/vehicles'
import { styles } from '@/styles/register'
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
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type VehicleCategory = 'Elétrico' | 'Híbrido'

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

  function handleNextStep() {
    if (step === 1) {
      if (!name || !email || !phone || !password) {
        Alert.alert('Campos obrigatórios', 'Preencha seus dados pessoais.')
        return
      }

      setStep(2)
      return
    }

    if (step === 2) {
      if (!vehicleModel) {
        Alert.alert('Veículo obrigatório', 'Informe o modelo do seu veículo.')
        return
      }

      handleRegister()
    }
  }

  function handleBackStep() {
    if (step === 1) {
      router.push('/login')
      return
    }

    setStep(1)
  }

  async function handleRegister() {
    try {
      setLoading(true)

      await registerUser({
        name,
        email,
        phone,
        password,
      })

      await createVehicle({
        name: vehicleModel,
        model: vehicleModel,
        year: new Date().getFullYear(),
        category,
        charger_type: 'Carga rápida',
        connector_type: 'CCS2',
      })

      router.replace('/(tabs)')
    } catch (error) {
      Alert.alert(
        'Erro ao criar conta',
        error instanceof Error ? error.message : 'Tente novamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <ImageBackground
      source={require('@/assets/images/splash-carregando-futuro.png')}
      resizeMode="cover"
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
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.brandArea}>
            <Image
              source={require('@/assets/images/flui-bolt.png')}
              style={styles.bolt}
              resizeMode="contain"
            />

            <Text style={styles.logo}>FLUI</Text>
            <Text style={styles.logoSubtitle}>ETAPA {step} DE 2</Text>
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
                    <Feather name="lock" size={20} color={COLORS.purpleNeon} />

                    <TextInput
                      placeholder="Crie sua senha"
                      placeholderTextColor="rgba(255,255,255,0.45)"
                      style={styles.input}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                    />

                    <Pressable onPress={() => setShowPassword(prev => !prev)}>
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
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleNextStep}
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
                  <Text style={styles.buttonText}>
                    {step === 1 ? 'Continuar' : 'Criar conta'}
                  </Text>
                )}
              </LinearGradient>
            </Pressable>

            {step > 1 && (
              <Pressable style={styles.footerLink} onPress={handleBackStep}>
                <Text style={styles.footerText}>Voltar etapa</Text>
              </Pressable>
            )}
          </View>

          {step === 1 && (
            <Pressable
              style={styles.footerLink}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.footerText}>
                Já possui conta? <Text style={styles.footerStrong}>Entrar</Text>
              </Text>
            </Pressable>
          )}
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  )
}

function InputField(props: any) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{props.label}</Text>

      <View style={styles.inputBox}>
        <Feather name={props.icon} size={20} color={COLORS.purpleNeon} />

        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor="rgba(255,255,255,0.45)"
          style={styles.input}
          value={props.value}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          autoCapitalize={props.autoCapitalize}
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

      <View style={{ flexDirection: 'row', gap: 10 }}>
        {options.map(option => {
          const active = value === option

          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: active
                  ? COLORS.greenNeon
                  : 'rgba(183,72,251,0.45)',
                backgroundColor: active
                  ? 'rgba(57,255,20,0.10)'
                  : 'rgba(14,14,14,0.84)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: active ? COLORS.greenNeon : COLORS.white,
                  fontSize: 14,
                  fontWeight: '800',
                }}
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