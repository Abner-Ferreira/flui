export type ConnectorType = 'CCS2' | 'CHAdeMO' | 'Tipo 1' | 'Tipo 2'
export type ChargerType = 'Carga rápida' | 'Carga normal'

export type Station = {
  id: string
  name: string
  latitude: number
  longitude: number
  rating: number
  reviewsCount: number
  distance: string
  time: string
  status: 'Disponível agora' | 'Ocupado'
  connectors: ConnectorType[]
  chargerType: ChargerType
  powerKw: number
  powerWatts: number
  hours: string
  amenities: string[]
  chargers: number
}