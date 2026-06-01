import { COLORS } from '@/constants/colors'
import { useStations } from '@/hooks/useStations'
import { styles } from '@/services/favorites'
import { getFavorites } from '@/services/station-actions'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { router, useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View
} from 'react-native'

export default function FavoritesScreen() {
  const { stations } = useStations()

  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  async function loadFavorites() {
    try {
      setLoading(true)

      const favorites = await getFavorites()

      setFavoriteIds(favorites.map(item => item.station_id))
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadFavorites()
    }, [])
  )

  const favoriteStations = stations.filter(station =>
    favoriteIds.includes(station.id)
  )

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={COLORS.greenNeon} />
        <Text style={styles.loadingText}>Carregando favoritos...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Feather name="chevron-left" size={24} color={COLORS.white} />
        </Pressable>

        <View>
          <Text style={styles.title}>Favoritos</Text>
          <Text style={styles.subtitle}>Seus pontos de recarga favoritos</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {favoriteStations.length === 0 ? (
          <View style={styles.emptyCard}>
            <Feather name="heart" size={42} color={COLORS.purpleNeon} />

            <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>

            <Text style={styles.emptyText}>
              Adicione postos aos favoritos para acessá-los rapidamente.
            </Text>
          </View>
        ) : (
          favoriteStations.map(station => (
            <View key={station.id} style={styles.card}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="ev-station"
                  size={28}
                  color={COLORS.greenNeon}
                />
              </View>

              <View style={styles.content}>
                <Text style={styles.stationName}>{station.name}</Text>
                <Text style={styles.stationMeta}>{station.chargerType}</Text>
                <Text style={styles.stationDistance}>{station.distance}</Text>
              </View>

              <Feather name="heart" size={22} color="#ff4d6d" />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

