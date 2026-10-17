import { COLORS } from '@/constants/colors'
import { createActivity } from '@/services/activities'
import { getLoggedUser, updateLoggedUser, User } from '@/services/auth'
import { styles } from '@/services/edit-profile'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native'
import { Alert } from '@/lib/alert'

export default function EditProfileScreen() {
  const [user, setUser] = useState<User | null>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadUser() {
      try {
        const loggedUser = await getLoggedUser()

        if (loggedUser) {
          setUser(loggedUser)
          setName(loggedUser.name)
          setEmail(loggedUser.email)
          setPhone(loggedUser.phone)
        }
      } catch {
        Alert.alert('Erro', 'Não foi possível carregar seus dados.')
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  async function handleSave() {
    if (!name || !email || !phone) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos.')
      return
    }

    try {
      setSaving(true)

      await updateLoggedUser({
        name,
        email,
        phone,
      })

      await createActivity({
        type: 'edit',
        title: 'Perfil atualizado',
        description: `Seus dados pessoais foram atualizados.`,
      })

      Alert.alert('Perfil atualizado', 'Seus dados foram salvos com sucesso.')

      router.back()
    } catch (error) {
      Alert.alert(
        'Erro ao salvar',
        error instanceof Error ? error.message : 'Tente novamente.'
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={COLORS.greenNeon} />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Feather name='chevron-left' size={26} color={COLORS.white} />
        </Pressable>

        <View>
          <Text style={styles.title}>Editar perfil</Text>
          <Text style={styles.subtitle}>Atualize seus dados pessoais</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Feather name='user' size={42} color={COLORS.white} />
        </View>

        <Text style={styles.userName}>{user?.name || 'Motorista FLUI'}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Nome completo</Text>

          <View style={styles.inputBox}>
            <Feather name='user' size={20} color={COLORS.purpleNeon} />

            <TextInput
              placeholder='Digite seu nome'
              placeholderTextColor='rgba(255,255,255,0.45)'
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

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
          <Text style={styles.label}>Telefone</Text>

          <View style={styles.inputBox}>
            <Feather name='phone' size={20} color={COLORS.purpleNeon} />

            <TextInput
              placeholder='(11) 99999-9999'
              placeholderTextColor='rgba(255,255,255,0.45)'
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType='phone-pad'
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </Pressable>

        <Pressable
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.saveText}>Salvar</Text>
          )}
        </Pressable>
      </View>
    </View>
  )
}
