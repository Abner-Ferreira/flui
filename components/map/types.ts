import type { Station } from '@/types/station'

export type Coordinates = {
  latitude: number
  longitude: number
}

/** Pedido para o mapa voar até um ponto. `nonce` muda a cada pedido, mesmo com as mesmas coordenadas. */
export type MapFocus = Coordinates & {
  nonce: number
}

export type StationMapProps = {
  stations: Station[]
  selectedId: string | null
  userLocation: Coordinates | null
  focus: MapFocus | null
  onSelectStation: (station: Station | null) => void
  /** Espaço (px) reservado embaixo para a tab bar, para não cobrir zoom/atribuição do mapa. */
  bottomInset?: number
}
