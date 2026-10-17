import { COLORS } from '@/constants/colors'
import { useFavorites } from '@/hooks/useFavorites'
import { createActivity } from '@/services/activities'
import {
  getStationReviews,
  reviewStation,
  StationReview,
} from '@/services/station-actions'
import { styles } from '@/styles/stationBottomSheet'
import type { Station } from '@/types/station'
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { useEffect, useMemo, useState } from 'react'
import {
  ActionSheetIOS,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { Alert } from '@/lib/alert'

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
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}&travelmode=driving`
  const wazeUrl = `https://waze.com/ul?ll=${station.latitude},${station.longitude}&navigate=yes`
  const appleMapsUrl = `http://maps.apple.com/?daddr=${station.latitude},${station.longitude}&dirflg=d`

  const openUrl = async (url: string) => {
    try {
      await createActivity({
        station_id: station.id,
        type: 'route',
        title: 'Trajeto iniciado',
        description: `Você iniciou um trajeto até ${station.name}.`,
      })
    } catch {}

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

  if (Platform.OS === 'web') {
    // No navegador não há ActionSheet nem Alert com vários botões: abre o Google Maps direto
    openUrl(googleMapsUrl)
    return
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
        if (buttonIndex === 1) openUrl(googleMapsUrl)
        if (buttonIndex === 2) openUrl(wazeUrl)
        if (buttonIndex === 3) openUrl(appleMapsUrl)
      }
    )

    return
  }

  Alert.alert(
    'Iniciar trajeto',
    `Escolha o app para navegar até ${station.name}`,
    [
      { text: 'Google Maps', onPress: () => openUrl(googleMapsUrl) },
      { text: 'Waze', onPress: () => openUrl(wazeUrl) },
      { text: 'Cancelar', style: 'cancel' },
    ]
  )
}

export function StationBottomSheet({ station }: Props) {
  const { favorites, toggleFavorite } = useFavorites()

  const [reviews, setReviews] = useState<StationReview[]>([])
  const [reviewModalVisible, setReviewModalVisible] = useState(false)
  const [selectedRating, setSelectedRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)

  useEffect(() => {
    async function loadReviews() {
      if (!station?.id) {
        setReviews([])
        return
      }

      try {
        const data = await getStationReviews(station.id)
        setReviews(data)
      } catch {
        setReviews([])
      }
    }

    loadReviews()
  }, [station?.id])

  const averageRating = useMemo(() => {
    if (!station) return 0

    if (reviews.length === 0) {
      return station.rating || 0
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0)

    return Number((total / reviews.length).toFixed(1))
  }, [reviews, station])

  async function handleReview() {
    if (!station || submittingReview) return

    try {
      setSubmittingReview(true)

      await reviewStation({
        stationId: station.id,
        rating: selectedRating,
        comment: comment.trim() || undefined,
      })

      const data = await getStationReviews(station.id)

      setReviews(data)
      setComment('')
      setSelectedRating(5)
      setReviewModalVisible(false)

      Alert.alert('Avaliação enviada', 'Obrigado por avaliar este posto.')
    } catch {
      Alert.alert('Erro', 'Não foi possível enviar sua avaliação.')
    } finally {
      setSubmittingReview(false)
    }
  }

  if (!station) return null

  const isFastCharge = station.chargerType === 'Carga rápida'
  const isFavorite = favorites.includes(station.id)

  return (
    <>
      <View style={styles.card}>
        <View style={styles.handle} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>{station.name}</Text>

              <View style={styles.rating}>
                <FontAwesome5 name='star' size={14} color={COLORS.gold} solid />
                <Text style={styles.text}>
                  {averageRating > 0 ? averageRating : 'Sem avaliações'}
                </Text>

                <Text style={styles.text}>
                  {reviews.length === 1
                    ? '1 avaliação'
                    : `${reviews.length} avaliações`}
                </Text>
              </View>
            </View>

            <View style={styles.timeBox}>
              <Feather name='clock' size={22} color={COLORS.greenNeon} />
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
                name='ev-station'
                size={18}
                color={COLORS.greenNeon}
              />

              <Text style={styles.detail}>
                {station.chargers} carregadores disponíveis
              </Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name='clock-outline'
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

          <View style={styles.actionsContainer}>
            <Pressable
              style={[
                styles.favoriteButton,
                isFavorite && styles.favoriteButtonActive,
              ]}
              onPress={() => toggleFavorite(station.id)}
            >
              <FontAwesome5
                name='heart'
                size={16}
                color={COLORS.white}
                solid={isFavorite}
              />

              <Text style={styles.actionButtonText}>
                {isFavorite ? 'Favoritado' : 'Favoritar'}
              </Text>
            </Pressable>

            <Pressable
              style={styles.reviewButton}
              onPress={() => setReviewModalVisible(true)}
            >
              <FontAwesome5 name='star' size={16} color={COLORS.white} solid />

              <Text style={styles.actionButtonText}>Avaliar</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.button}
            onPress={() => openNavigationOptions(station)}
          >
            <MaterialCommunityIcons
              name='navigation-variant'
              size={18}
              color={COLORS.white}
            />

            <Text style={styles.buttonText}>Iniciar Trajeto Agora</Text>
          </Pressable>
        </ScrollView>
      </View>

      <Modal
        transparent
        visible={reviewModalVisible}
        animationType='fade'
        onRequestClose={() => setReviewModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.reviewModal}>
            <Text style={styles.modalTitle}>Avaliar posto</Text>
            <Text style={styles.modalSubtitle}>{station.name}</Text>

            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map(star => (
                <Pressable key={star} onPress={() => setSelectedRating(star)}>
                  <FontAwesome5
                    name='star'
                    size={30}
                    color={
                      star <= selectedRating
                        ? COLORS.gold
                        : 'rgba(255,255,255,0.25)'
                    }
                    solid
                  />
                </Pressable>
              ))}
            </View>

            <TextInput
              placeholder='Comentário opcional'
              placeholderTextColor='rgba(255,255,255,0.45)'
              style={styles.reviewInput}
              value={comment}
              onChangeText={setComment}
              multiline
            />

            <View style={styles.modalActions}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setReviewModalVisible(false)}
                disabled={submittingReview}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={styles.sendButton}
                onPress={handleReview}
                disabled={submittingReview}
              >
                <Text style={styles.sendText}>
                  {submittingReview ? 'Enviando...' : 'Enviar'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}
