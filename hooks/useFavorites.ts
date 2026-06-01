import { useEffect, useState } from 'react'
import {
  favoriteStation,
  getFavorites,
  unfavoriteStation,
} from '@/services/station-actions'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  async function loadFavorites() {
    try {
      const data = await getFavorites()

      setFavorites(
        data.map(item => item.station_id)
      )
    } catch (error) {
      console.log(error)
    }
  }

  async function toggleFavorite(stationId: string) {
    const isFavorite = favorites.includes(stationId)

    try {
      if (isFavorite) {
        await unfavoriteStation(stationId)

        setFavorites(prev =>
          prev.filter(id => id !== stationId)
        )
      } else {
        await favoriteStation(stationId)

        setFavorites(prev => [...prev, stationId])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  return {
    favorites,
    toggleFavorite,
  }
}