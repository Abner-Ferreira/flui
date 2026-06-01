import { useEffect, useState } from 'react'
import { getStations } from '@/services/stations'
import { Station } from '@/types/station'

export function useStations() {
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStations() {
      try {
        const data = await getStations()
        setStations(data)
      } catch {
        setError('Erro ao carregar postos')
      } finally {
        setLoading(false)
      }
    }

    loadStations()
  }, [])

  return {
    stations,
    loading,
    error,
  }
}