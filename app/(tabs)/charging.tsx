import { COLORS } from '@/constants/colors'
import { createActivity } from '@/services/activities'
import { styles } from '@/styles/charging'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useState } from 'react'
import {
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native'
import { Alert } from '@/lib/alert'

export default function ChargeScreen() {
  const [permission, requestPermission] = useCameraPermissions()
  const [scanned, setScanned] = useState(false)
  const [chargerCode, setChargerCode] = useState('')
  const [charging, setCharging] = useState(false)

  async function handleQRCodeScanned(data: string) {
    if (scanned) return

    setScanned(true)
    setChargerCode(data)

    Alert.alert('QR Code lido', `Carregador identificado: ${data}`)
  }

  async function handleStartCharge() {
    if (!chargerCode.trim()) {
      Alert.alert('Código obrigatório', 'Escaneie ou digite o código do carregador.')
      return
    }

    try {
      setCharging(true)

      await createActivity({
        type: 'charge',
        title: 'Recarga iniciada',
        description: `Você iniciou uma recarga no carregador ${chargerCode}.`,
      })

      Alert.alert('Recarga iniciada', 'O carregador foi liberado com sucesso.')
    } catch {
      Alert.alert('Erro', 'Não foi possível iniciar a recarga.')
    }
  }

  async function handleFinishCharge() {
    try {
      setCharging(false)
      setScanned(false)
      setChargerCode('')

      await createActivity({
        type: 'charge',
        title: 'Recarga finalizada',
        description: 'Você finalizou uma recarga no FLUI.',
      })

      Alert.alert('Recarga finalizada', 'Sua atividade foi salva no histórico.')
    } catch {
      Alert.alert('Erro', 'Não foi possível finalizar a recarga.')
    }
  }

  if (!permission) {
    return <View style={styles.container} />
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <MaterialCommunityIcons
          name="camera-off"
          size={58}
          color={COLORS.purpleNeon}
        />

        <Text style={styles.permissionTitle}>Permissão da câmera</Text>

        <Text style={styles.permissionText}>
          Precisamos acessar a câmera para escanear o QR Code do carregador.
        </Text>

        <Pressable style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Permitir câmera</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carregar</Text>
      <Text style={styles.subtitle}>Escaneie o QR Code do carregador</Text>

      <View style={styles.scannerCard}>
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={({ data }) => handleQRCodeScanned(data)}
        />

        <View style={styles.scannerOverlay}>
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />

          <View style={styles.scannerTextBox}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={26}
              color={COLORS.greenNeon}
            />

            <Text style={styles.scannerText}>
              Posicione o QR Code dentro da área
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.manualCard}>
        <Text style={styles.label}>Não consegue escanear?</Text>

        <View style={styles.inputBox}>
          <Feather name="hash" size={20} color={COLORS.purpleNeon} />

          <TextInput
            placeholder="Digite o código do carregador"
            placeholderTextColor="rgba(255,255,255,0.45)"
            style={styles.input}
            value={chargerCode}
            onChangeText={setChargerCode}
            autoCapitalize="characters"
          />
        </View>
      </View>

      {!charging ? (
        <Pressable style={styles.startButton} onPress={handleStartCharge}>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={22}
            color={COLORS.white}
          />
          <Text style={styles.startButtonText}>Iniciar recarga</Text>
        </Pressable>
      ) : (
        <View style={styles.chargingCard}>
          <View style={styles.chargingHeader}>
            <MaterialCommunityIcons
              name="battery-charging"
              size={28}
              color={COLORS.greenNeon}
            />

            <View>
              <Text style={styles.chargingTitle}>Recarga em andamento</Text>
              <Text style={styles.chargingSubtitle}>
                Carregador {chargerCode}
              </Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <Pressable style={styles.finishButton} onPress={handleFinishCharge}>
            <Text style={styles.finishButtonText}>Finalizar recarga</Text>
          </Pressable>
        </View>
      )}

      {scanned && !charging && (
        <Pressable
          style={styles.scanAgainButton}
          onPress={() => {
            setScanned(false)
            setChargerCode('')
          }}
        >
          <Text style={styles.scanAgainText}>Escanear novamente</Text>
        </Pressable>
      )}
    </View>
  )
}

