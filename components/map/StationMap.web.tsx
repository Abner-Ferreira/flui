
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { buildMapHtml } from './mapHtml'
import type { Coordinates, MapFocus, StationMapProps } from './types'
import { useMapBridge } from './useMapBridge'

export function StationMap({ bottomInset, ...props }: StationMapProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const [deviceLocation, setDeviceLocation] = useState<Coordinates | null>(null)
  const [locationFocus, setLocationFocus] = useState<MapFocus | null>(null)

  const html = useMemo(
    () => buildMapHtml({ bottomInset }),
    [bottomInset]
  )

  const send = useCallback((message: Record<string, unknown>) => {
    iframeRef.current?.contentWindow?.postMessage(
      { ...message, __flui: true },
      '*'
    )
  }, [])

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      console.warn(
        '[Flui] Geolocalização não é suportada neste navegador.'
      )
      return
    }

    let active = true

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!active) return

        const coordinates: Coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }

        setDeviceLocation(coordinates)

        setLocationFocus({
          ...coordinates,
          nonce: Date.now(),
        })
      },
      (error) => {
        if (!active) return

        console.warn(
          '[Flui] Não foi possível obter a localização:',
          error.message
        )
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 30000,
      }
    )

    return () => {
      active = false
    }
  }, [])

  const userLocation = deviceLocation ?? props.userLocation
  const focus = props.focus ?? locationFocus

  const { handleMessage } = useMapBridge({
    ...props,
    userLocation,
    focus,
    send,
  })

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.source !== iframeRef.current?.contentWindow) return
      handleMessage(event.data)
    }

    window.addEventListener('message', onMessage)

    return () => window.removeEventListener('message', onMessage)
  }, [handleMessage])

  return (
    <View style={StyleSheet.absoluteFill}>
      <iframe
        ref={iframeRef}
        title="Mapa de estações de recarga"
        srcDoc={html}
        onLoad={() => send({ type: 'hello' })}
        allow="geolocation"
        style={{
          border: 'none',
          width: '100%',
          height: '100%',
          display: 'block',
          backgroundColor: '#05050c',
        }}
      />
    </View>
  )
}
