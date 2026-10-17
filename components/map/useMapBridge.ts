import type { Station } from '@/types/station'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { MapFocus, StationMapProps } from './types'

type Params = Pick<
  StationMapProps,
  'stations' | 'selectedId' | 'userLocation' | 'focus' | 'onSelectStation'
> & {
  /** Envia uma mensagem para dentro do mapa (implementação varia por plataforma). */
  send: (message: Record<string, unknown>) => void
}

type InboundMessage =
  | { type: 'ready' }
  | { type: 'select'; id: string }
  | { type: 'mapPress' }
  | { type: 'error'; message: string }

function toSlim(station: Station) {
  return {
    id: station.id,
    latitude: station.latitude,
    longitude: station.longitude,
    status: station.status,
    rating: station.rating,
  }
}

function parseMessage(raw: unknown): InboundMessage | null {
  try {
    const data = typeof raw === 'string' ? JSON.parse(raw) : raw
    if (data && typeof data === 'object' && typeof (data as any).type === 'string') {
      return data as InboundMessage
    }
  } catch {}
  return null
}

/**
 * Mantém o mapa (que roda numa página HTML isolada) em sincronia com o estado do React
 * e traduz os eventos do mapa (toque em marcador, toque no fundo) em callbacks.
 */
export function useMapBridge({
  stations,
  selectedId,
  userLocation,
  focus,
  onSelectStation,
  send,
}: Params) {
  // Contador em vez de boolean: se a página recarregar, "ready" chega de novo
  // e tudo é reenviado.
  const [readyCount, setReadyCount] = useState(0)
  const ready = readyCount > 0

  const stationsRef = useRef(stations)
  stationsRef.current = stations

  useEffect(() => {
    if (!ready) return
    send({ type: 'stations', stations: stations.map(toSlim) })
  }, [ready, readyCount, stations, send])

  useEffect(() => {
    if (!ready) return
    send({ type: 'selected', id: selectedId })
  }, [ready, readyCount, selectedId, stations, send])

  useEffect(() => {
    if (!ready || !userLocation) return
    send({ type: 'user', ...userLocation })
  }, [ready, readyCount, userLocation, send])

  useEffect(() => {
    if (!ready || !focus) return
    sendFocus(send, focus)
  }, [ready, readyCount, focus, send])

  const handleMessage = useCallback(
    (raw: unknown) => {
      const message = parseMessage(raw)
      if (!message) return

      switch (message.type) {
        case 'ready':
          setReadyCount(count => count + 1)
          break
        case 'select':
          onSelectStation(
            stationsRef.current.find(s => s.id === message.id) ?? null
          )
          break
        case 'mapPress':
          onSelectStation(null)
          break
        case 'error':
          console.warn('[StationMap]', message.message)
          break
      }
    },
    [onSelectStation]
  )

  return { handleMessage }
}

function sendFocus(
  send: (message: Record<string, unknown>) => void,
  focus: MapFocus
) {
  send({
    type: 'flyTo',
    latitude: focus.latitude,
    longitude: focus.longitude,
    zoom: 15,
  })
}
