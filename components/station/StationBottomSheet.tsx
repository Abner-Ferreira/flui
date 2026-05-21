import { COLORS } from '../../constants/colors'
import { Station } from '../../types/station'
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import {
  ActionSheetIOS,
  Alert,
  Linking,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native'
import { styles } from './stationBottomSheet'

type Props = {
  station: Station | null
}

function getAmenityIcon(amenity: string) {
  switch (amenity) {
    case 'Wi-Fi':
      return 'wifi'
    case 'Café':
      return 'coffee'
    case 'Banheiro':
      return 'toilet'
    case 'Estacionamento':
      return 'parking'
    case 'Shopping':
      return 'shopping'
    case 'Coworking':
      return 'laptop'
    case 'Mercado':
      return 'cart'
    case 'Restaurante':
      return 'silverware-fork-knife'
    case 'Lavagem':
      return 'car-wash'
    case 'Conveniência':
      return 'store'
    case 'Praia':
      return 'beach'
    default:
      return 'star'
  }
}

function getConnectorIcon(connector: string) {
  switch (connector) {
    case 'CCS2':
      return 'lightning-bolt'
    case 'CHAdeMO':
      return 'ev-plug-chademo'
    case 'Tipo 1':
      return 'power-plug'
    case 'Tipo 2':
      return 'ev-plug-type2'
    default:
      return 'power-plug'
  }
}

function getPowerIcon(powerKw: number) {
  if (powerKw >= 150) return 'flash'
  if (powerKw >= 50) return 'speedometer'
  return 'battery'
}

async function openNavigationOptions(station: Station) {
  const encodedName = encodeURIComponent(station.name)

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}&destination_place_id=${encodedName}&travelmode=driving`

  const wazeUrl = `https://waze.com/ul?ll=${station.latitude},${station.longitude}&navigate=yes`

  const appleMapsUrl = `http://maps.apple.com/?daddr=${station.latitude},${station.longitude}&dirflg=d`

  const openUrl = async (url: string) => {
    const canOpen = await Linking.canOpenURL(url)

    if (!canOpen) {
      Alert.alert(
        'Aplicativo indisponível',
        'Não foi possível abrir esse aplicativo de navegação.'
      )
      return
    }

    await Linking.openURL(url)
  }

  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Iniciar trajeto',
        message: `Escolha o app para navegar até ${station.name}`,
        options: ['Cancelar', 'Google Maps', 'Waze', 'Apple Maps'],
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          openUrl(googleMapsUrl)
        }

        if (buttonIndex === 2) {
          openUrl(wazeUrl)
        }

        if (buttonIndex === 3) {
          openUrl(appleMapsUrl)
        }
      }
    )

    return
  }

  Alert.alert(
    'Iniciar trajeto',
    `Escolha o app para navegar até ${station.name}`,
    [
      {
        text: 'Google Maps',
        onPress: () => openUrl(googleMapsUrl),
      },
      {
        text: 'Waze',
        onPress: () => openUrl(wazeUrl),
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]
  )
}

export function StationBottomSheet({ station }: Props) {
  if (!station) return null

  const isFastCharge = station.chargerType === 'Carga rápida'

  return (
    <View style={styles.card}>
      <View style={styles.handle} />

      <View style={styles.header}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{station.name}</Text>

          <View style={styles.rating}>
            <FontAwesome5 name="star" size={14} color={COLORS.gold} solid />
            <Text style={styles.text}>{station.rating}</Text>
            <Text style={styles.text}>ver avaliações</Text>
          </View>
        </View>

        <View style={styles.timeBox}>
          <Feather name="clock" size={22} color={COLORS.greenNeon} />
          <Text style={styles.time}>{station.time}</Text>
        </View>
      </View>

      <View style={styles.chargeBadge}>
        <MaterialCommunityIcons
          name={isFastCharge ? 'lightning-bolt' : 'ev-plug-type2'}
          size={18}
          color={isFastCharge ? COLORS.greenNeon : COLORS.white}
        />
        <Text style={styles.chargeBadgeText}>{station.chargerType}</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons
            name={getPowerIcon(station.powerKw) as any}
            size={18}
            color={COLORS.greenNeon}
          />

          <Text style={styles.detail}>
            {station.powerKw}kW / {station.powerWatts}W
          </Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons
            name="ev-station"
            size={18}
            color={COLORS.greenNeon}
          />

          <Text style={styles.detail}>
            {station.chargers} carregadores disponíveis
          </Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={18}
            color={COLORS.greenNeon}
          />

          <Text style={styles.detail}>{station.hours}</Text>
        </View>

        <View style={styles.connectorsContainer}>
          {station.connectors.map((connector: string) => (
            <View key={connector} style={styles.connectorBadge}>
              <MaterialCommunityIcons
                name={getConnectorIcon(connector) as any}
                size={16}
                color={COLORS.greenNeon}
              />

              <Text style={styles.connectorText}>{connector}</Text>
            </View>
          ))}
        </View>

        <View style={styles.amenitiesContainer}>
          {station.amenities.map((amenity: string) => (
            <View key={amenity} style={styles.amenityBadge}>
              <MaterialCommunityIcons
                name={getAmenityIcon(amenity) as any}
                size={16}
                color={COLORS.greenNeon}
              />

              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => openNavigationOptions(station)}
      >
        <MaterialCommunityIcons
          name="navigation-variant"
          size={18}
          color={COLORS.white}
        />
        <Text style={styles.buttonText}>Iniciar Trajeto Agora</Text>
      </Pressable>
    </View>
  )
}