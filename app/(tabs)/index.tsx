import { FilterChips } from '@/components/filter/FilterChips'
import { StationMap } from '@/components/map/StationMap'
import type { Coordinates, MapFocus } from '@/components/map/types'
import { StationBottomSheet } from '@/components/station/StationBottomSheet'
import { COLORS } from '@/constants/colors'
import { useStations } from '@/hooks/useStations'
import { styles } from '@/styles/home'
import { Station } from '@/types/station'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import * as Location from 'expo-location'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native'

// Altura da tab bar (88) + folga: mantém zoom/atribuição do mapa visíveis
const MAP_BOTTOM_INSET = 96

export default function ChargingMapScreen() {
  const [selectedStation, setSelectedStation] =
    useState<Station | null>(null)

  const [selectedFilters, setSelectedFilters] =
    useState<string[]>([])

  const [search, setSearch] = useState('')

  const [userLocation, setUserLocation] =
    useState<Coordinates | null>(null)

  const [focus, setFocus] = useState<MapFocus | null>(null)

  const { stations, loading, error } = useStations()

  const locateUser = useCallback(async () => {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        return
      }

      const location =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        })

      const coords: Coordinates = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }

      setUserLocation(coords)
      setFocus({ ...coords, nonce: Date.now() })
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    locateUser()
  }, [locateUser])

  function toggleFilter(filter: string) {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(item => item !== filter)
        : [...prev, filter]
    )
  }

  const filteredStations = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase()

    return stations.filter(station => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        station.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        station.connectors.some(connector =>
          connector
            .toLowerCase()
            .includes(normalizedSearch)
        ) ||
        station.amenities.some(amenity =>
          amenity
            .toLowerCase()
            .includes(normalizedSearch)
        )

      if (!matchesSearch) {
        return false
      }

      return selectedFilters.every(filter => {
        if (filter === 'Disponível agora') {
          return (
            station.status ===
            'Disponível agora'
          )
        }

        if (filter === 'Carga rápida') {
          return (
            station.chargerType ===
            'Carga rápida'
          )
        }

        if (filter === 'Carga normal') {
          return (
            station.chargerType ===
            'Carga normal'
          )
        }
                // Linha 111

        if (['CCS2', 'CHAdeMO', 'Tipo 1', 'Tipo 2'].includes(filter)) {
          return station.connectors.includes(filter as any)
        }

        if (filter === '50kW+') {
          return station.powerKw >= 50
        }

        if (filter === '150kW+') {
          return station.powerKw >= 150
        }

        if (
          ['Wi-Fi', 'Café', 'Banheiro', 'Estacionamento'].includes(filter)
        ) {
          return station.amenities.includes(filter)
        }

        return true
      })
    })
  }, [search, selectedFilters, stations])

  return (
    <View style={styles.container}>
      <StationMap
        stations={filteredStations}
        selectedId={selectedStation?.id ?? null}
        userLocation={userLocation}
        focus={focus}
        onSelectStation={setSelectedStation}
        bottomInset={MAP_BOTTOM_INSET}
      />

      <View style={styles.topContent}>
        <View style={styles.searchBox}>
          <Feather
            name="search"
            size={22}
            color={COLORS.white}
          />

          <TextInput
            placeholder="Buscar por nome ou região"
            placeholderTextColor={COLORS.white}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <FilterChips
          selected={selectedFilters}
          onToggle={toggleFilter}
        />
      </View>

      {loading && (
        <View style={styles.feedbackBox}>
          <ActivityIndicator
            color={COLORS.greenNeon}
          />

          <Text style={styles.feedbackText}>
            Carregando postos...
          </Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.feedbackBox}>
          <Text style={styles.feedbackText}>
            {error}
          </Text>
        </View>
      )}

      {!loading &&
        !error &&
        filteredStations.length === 0 && (
          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackText}>
              Nenhum posto encontrado
            </Text>
          </View>
        )}

      {!selectedStation && (
        <Pressable
          style={styles.locateButton}
          onPress={locateUser}
          accessibilityRole="button"
          accessibilityLabel="Ir para a minha localização"
        >
          <MaterialCommunityIcons
            name="crosshairs-gps"
            size={24}
            color={COLORS.greenNeon}
          />
        </Pressable>
      )}

      <StationBottomSheet
        station={selectedStation}
      />
    </View>
  )
}