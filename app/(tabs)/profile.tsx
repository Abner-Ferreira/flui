import { COLORS } from '@/constants/colors'
import { getVehicles, Vehicle } from '@/services/vehicles'
import { styles } from '@/styles/profile'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { router, useFocusEffect } from 'expo-router'
import * as storage from '@/services/storage'
import { useCallback, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { Alert } from '@/lib/alert'

type User = {
  id: string
  name: string
  email: string
  phone: string
  role: 'DRIVER'
}

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  async function loadProfile() {
    try {
      setLoading(true)

      const storedUser = await storage.getItemAsync('flui_user')
      const vehiclesData = await getVehicles()

      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }

      setVehicles(vehiclesData)
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar seu perfil.')
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadProfile()
    }, [])
  )

  async function handleLogout() {
    Alert.alert('Sair da conta', 'Deseja realmente sair?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await storage.deleteItemAsync('flui_token')
          await storage.deleteItemAsync('flui_user')

          router.replace('/login')
        },
      },
    ])
  }

  const mainVehicle = vehicles.length > 0 ? vehicles[0] : null

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={COLORS.greenNeon} />
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>Perfil</Text>
      <Text style={styles.pageSubtitle}>Gerencie sua conta FLUI</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Feather name='user' size={42} color={COLORS.white} />
        </View>

        <Text style={styles.name}>{user?.name || 'Motorista FLUI'}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <View style={styles.badge}>
          <MaterialCommunityIcons
            name='car-electric'
            size={16}
            color={COLORS.greenNeon}
          />

          <Text style={styles.badgeText}>Motorista FLUI</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados pessoais</Text>

        <InfoRow icon='user' label='Nome' value={user?.name || '-'} />
        <InfoRow icon='mail' label='E-mail' value={user?.email || '-'} />
        <InfoRow icon='phone' label='Telefone' value={user?.phone || '-'} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Veículo principal</Text>

          <Pressable onPress={() => router.push('/vehicles')}>
            <Text style={styles.sectionAction}>Ver todos</Text>
          </Pressable>
        </View>

        {mainVehicle ? (
          <View style={styles.vehicleCard}>
            <View style={styles.vehicleIcon}>
              <MaterialCommunityIcons
                name={'car-electric'}
                size={30}
                color={COLORS.greenNeon}
              />
            </View>

            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>{mainVehicle.model}</Text>
              <Text style={styles.vehicleMeta}>
                {mainVehicle.category} • {mainVehicle.charger_type}
              </Text>
            </View>
          </View>
        ) : (
          <Pressable
            style={styles.emptyVehicleCard}
            onPress={() => router.push('/vehicles')}
          >
            <Feather name='plus' size={20} color={COLORS.purpleNeon} />
            <Text style={styles.emptyVehicleText}>Adicionar veículo</Text>
          </Pressable>
        )}
      </View>

      <Pressable
        style={styles.editButton}
        onPress={() => router.push('/edit-profile')}
      >
        <Feather name='edit-2' size={18} color={COLORS.white} />
        <Text style={styles.editButtonText}>Editar perfil</Text>
      </Pressable>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Feather name='log-out' size={18} color='#ff5a5a' />
        <Text style={styles.logoutText}>Sair da conta</Text>
      </Pressable>
    </ScrollView>
  )
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: any
  label: string
  value: string
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Feather name={icon} size={18} color={COLORS.purpleNeon} />
      </View>

      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  )
}


