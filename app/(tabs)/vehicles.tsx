import { COLORS } from '@/constants/colors'
import {
  Vehicle,
  createVehicle,
  deleteVehicle,
  getVehicles,
  updateVehicle,
} from '@/services/vehicles'
import { styles } from '@/styles/vehicles'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native'

type VehicleCategory = 'Elétrico' | 'Híbrido'
type ChargerType = 'Carga rápida' | 'Carga normal' | 'Ambos'

export default function VehiclesScreen() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)

  const [model, setModel] = useState('')
  const [category, setCategory] = useState<VehicleCategory>('Elétrico')
  const [chargerType, setChargerType] = useState<ChargerType>('Ambos')

  async function loadVehicles() {
    try {
      setLoading(true)
      const data = await getVehicles()
      setVehicles(data)
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar seus veículos.')
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadVehicles()
    }, [])
  )

  function openCreateModal() {
    setEditingVehicle(null)
    setModel('')
    setCategory('Elétrico')
    setChargerType('Ambos')
    setModalVisible(true)
  }

  function openEditModal(vehicle: Vehicle) {
    setEditingVehicle(vehicle)
    setModel(vehicle.model)
    setCategory(vehicle.category)
    setChargerType(vehicle.charger_type as ChargerType)
    setModalVisible(true)
  }

  async function handleSaveVehicle() {
    if (!model.trim()) {
      Alert.alert('Campo obrigatório', 'Informe o modelo do veículo.')
      return
    }

    try {
      const payload = {
        name: model,
        model,
        year: new Date().getFullYear(),
        category,
        charger_type: chargerType,
        connector_type: 'CCS2' as const,
      }

      if (editingVehicle) {
        await updateVehicle(editingVehicle.id, payload)
      } else {
        await createVehicle(payload)
      }

      setModalVisible(false)
      await loadVehicles()
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o veículo.')
    }
  }

  async function handleDeleteVehicle(vehicle: Vehicle) {
    Alert.alert('Remover veículo', `Deseja remover ${vehicle.model}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteVehicle(vehicle.id)
            await loadVehicles()
          } catch {
            Alert.alert('Erro', 'Não foi possível remover o veículo.')
          }
        },
      },
    ])
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Veículos</Text>
          <Text style={styles.subtitle}>Gerencie seus veículos elétricos</Text>
        </View>

        <Pressable style={styles.addButton} onPress={openCreateModal}>
          <Feather name='plus' size={28} color={COLORS.white} />
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator color={COLORS.greenNeon} />
          <Text style={styles.loadingText}>Carregando veículos...</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          {vehicles.map((vehicle, index) => (
            <LinearGradient
              key={vehicle.id}
              colors={['rgba(183,72,251,0.18)', 'rgba(18,18,18,0.95)']}
              style={styles.vehicleCard}
            >
              <View style={styles.vehicleIcon}>
                <MaterialCommunityIcons
                  name={'car-electric'}
                  size={34}
                  color={COLORS.greenNeon}
                />
              </View>

              <View style={styles.vehicleContent}>
                <View style={styles.vehicleHeader}>
                  <Text style={styles.vehicleName}>{vehicle.model}</Text>

                  {index === 0 && (
                    <View style={styles.activeBadge}>
                      <Text style={styles.activeText}>ATIVO</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.vehicleMeta}>
                  {vehicle.category} • {vehicle.charger_type}
                </Text>
              </View>

              <View style={styles.actions}>
                <Pressable
                  style={styles.actionButton}
                  onPress={() => openEditModal(vehicle)}
                >
                  <Feather name='edit-2' size={18} color={COLORS.white} />
                </Pressable>

                <Pressable
                  style={styles.actionButton}
                  onPress={() => handleDeleteVehicle(vehicle)}
                >
                  <Feather name='trash-2' size={18} color='#ff4d4d' />
                </Pressable>
              </View>
            </LinearGradient>
          ))}

          <Pressable style={styles.addVehicleCard} onPress={openCreateModal}>
            <Feather name='plus' size={22} color={COLORS.purpleNeon} />
            <Text style={styles.addVehicleText}>Adicionar veículo</Text>
          </Pressable>
        </ScrollView>
      )}

      <Modal transparent visible={modalVisible} animationType='fade'>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {editingVehicle ? 'Editar veículo' : 'Novo veículo'}
            </Text>

            <Text style={styles.label}>Modelo do veículo</Text>

            <View style={styles.inputBox}>
              <MaterialCommunityIcons
                name='car-electric'
                size={22}
                color={COLORS.purpleNeon}
              />

              <TextInput
                placeholder='Ex: BYD Dolphin, Volvo EX30...'
                placeholderTextColor='rgba(255,255,255,0.45)'
                style={styles.input}
                value={model}
                onChangeText={setModel}
              />
            </View>

            <SelectRow
              label='Categoria'
              options={['Elétrico', 'Híbrido']}
              value={category}
              onChange={value => setCategory(value as VehicleCategory)}
            />

            <SelectRow
              label='Tipo de carga'
              options={['Carga rápida', 'Carga normal', 'Ambos']}
              value={chargerType}
              onChange={value => setChargerType(value as ChargerType)}
            />

            <View style={styles.modalActions}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </Pressable>

              <Pressable style={styles.saveButton} onPress={handleSaveVehicle}>
                <Text style={styles.saveText}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    <View style={styles.selectGroup}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.selectRow}>
        {options.map(option => {
          const active = value === option

          return (
            <Pressable
              key={option}
              style={[styles.selectChip, active && styles.selectChipActive]}
              onPress={() => onChange(option)}
            >
              <Text
                style={[styles.selectText, active && styles.selectTextActive]}
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


