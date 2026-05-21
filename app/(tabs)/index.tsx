import { FilterChips } from '@/components/filter/FilterChips'
import { StationBottomSheet } from '@/components/station/StationBottomSheet'
import { StationMarker } from '@/components/station/StationMarker'
import { COLORS } from '@/constants/colors'
import { stations } from '@/data/stations'
import { darkMapStyle, styles } from '@/styles'
import { Station } from '@/types/station'
import { Feather } from '@expo/vector-icons'
import { useMemo, useState } from 'react'
import { TextInput, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

export default function ChargingMapScreen() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [search, setSearch] = useState('')

  function toggleFilter(filter: string) {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(item => item !== filter)
        : [...prev, filter]
    )
  }

  const filteredStations = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return stations.filter(station => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        station.name.toLowerCase().includes(normalizedSearch) ||
        station.connectors.some(connector =>
          connector.toLowerCase().includes(normalizedSearch)
        ) ||
        station.amenities.some(amenity =>
          amenity.toLowerCase().includes(normalizedSearch)
        )

      if (!matchesSearch) return false

      return selectedFilters.every(filter => {
        if (filter === 'Disponível agora') {
          return station.status === 'Disponível agora'
        }

        if (filter === 'Carga rápida') {
          return station.chargerType === 'Carga rápida'
        }

        if (filter === 'Carga normal') {
          return station.chargerType === 'Carga normal'
        }

        if (['CCS2', 'CHAdeMO', 'Tipo 1', 'Tipo 2'].includes(filter)) {
          return station.connectors.includes(filter as any)
        }

        if (filter === '50kW+') {
          return station.powerKw >= 50
        }

        if (filter === '150kW+') {
          return station.powerKw >= 150
        }

        if (['Wi-Fi', 'Café', 'Banheiro', 'Estacionamento'].includes(filter)) {
          return station.amenities.includes(filter)
        }

        return true
      })
    })
  }, [search, selectedFilters])

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
        customMapStyle={darkMapStyle}
        onPress={() => setSelectedStation(null)}
      >
        {filteredStations.map(station => (
          <Marker
            key={station.id}
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude,
            }}
            onPress={event => {
              event.stopPropagation()
              setSelectedStation(station)
            }}
          >
            <StationMarker />
          </Marker>
        ))}
      </MapView>

      <View style={styles.topContent}>
        <View style={styles.searchBox}>
          <Feather name='search' size={22} color={COLORS.white} />
          <TextInput
            placeholder='Buscar por nome ou região'
            placeholderTextColor={COLORS.white}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <FilterChips selected={selectedFilters} onToggle={toggleFilter} />
      </View>

      <StationBottomSheet station={selectedStation} />
    </View>
  )
}

