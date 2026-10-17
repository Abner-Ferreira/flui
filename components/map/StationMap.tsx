
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as Location from 'expo-location'
import { WebView, type WebViewMessageEvent } from 'react-native-webview'

import { buildMapHtml } from './mapHtml'
import type { Coordinates, MapFocus, StationMapProps } from './types'
import { useMapBridge } from './useMapBridge'

/**
 * Versão nativa (Android/iOS).
 *
 * Solicita permissão de localização, obtém a posição real
 * do dispositivo e a envia ao mapa Leaflet.
 */
export function StationMap({ bottomInset, ...props }: StationMapProps) {
  const webViewRef = useRef<WebView>(null)

  const [deviceLocation, setDeviceLocation] = useState<Coordinates | null>(null)
  const [locationFocus, setLocationFocus] = useState<MapFocus | null>(null)

  const html = useMemo(
    () => buildMapHtml({ bottomInset }),
    [bottomInset]
  )

  const send = useCallback((message: Record<string, unknown>) => {
    const json = JSON.stringify(message)
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029')

    webViewRef.current?.injectJavaScript(
      `window.__flui && window.__flui.receive(${json}); true;`
    )
  }, [])

  useEffect(() => {
    let active = true

    async function getUserLocation() {
      try {
        const permission =
          await Location.requestForegroundPermissionsAsync()

        if (!active) return

        if (permission.status !== 'granted') {
          console.warn(
            '[Flui] Permissão de localização não concedida.'
          )
          return
        }

        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        })

        if (!active) return

        const coordinates: Coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }

        setDeviceLocation(coordinates)

        // Centraliza o mapa na localização real do dispositivo.
        setLocationFocus({
          ...coordinates,
          nonce: Date.now(),
        })
      } catch (error) {
        console.warn(
          '[Flui] Não foi possível obter a localização:',
          error
        )
      }
    }

    void getUserLocation()

    return () => {
      active = false
    }
  }, [])

  // A localização real do dispositivo tem prioridade sobre
  // uma localização eventualmente fornecida pelo componente pai.
  const userLocation = deviceLocation ?? props.userLocation

  // Um foco explícito do componente pai tem prioridade.
  const focus = props.focus ?? locationFocus

  const { handleMessage } = useMapBridge({
    ...props,
    userLocation,
    focus,
    send,
  })

  return (
    <View style={StyleSheet.absoluteFill}>
      <WebView
        ref={webViewRef}
        source={{ html, baseUrl: 'https://flui.local' }}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        onMessage={(event: WebViewMessageEvent) =>
          handleMessage(event.nativeEvent.data)
        }
        onLoadEnd={() => send({ type: 'hello' })}
        scrollEnabled={false}
        bounces={false}
        overScrollMode="never"
        setSupportMultipleWindows={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.webView}
        containerStyle={styles.container}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#05050c',
  },
  webView: {
    flex: 1,
    backgroundColor: '#05050c',
  },
})
