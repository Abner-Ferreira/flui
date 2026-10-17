import {
  Alert as NativeAlert,
  Platform,
  type AlertButton,
  type AlertOptions,
} from 'react-native'

/**
 * Substituto de `Alert` do react-native que também funciona na web
 * (lá, `Alert.alert` não faz nada).
 *
 * Suporta os 3 usos do app:
 *  - aviso simples:            Alert.alert(titulo, mensagem)
 *  - confirmação:              [cancelar, ação]  -> window.confirm
 *  - vários botões de ação:    usa a primeira ação (trate Platform.OS === 'web' antes, se precisar de escolha)
 */
function webAlert(title: string, message?: string, buttons?: AlertButton[]) {
  const text = message ? `${title}\n\n${message}` : title

  if (typeof window === 'undefined') return

  if (!buttons || buttons.length === 0) {
    window.alert(text)
    return
  }

  const cancel = buttons.find(button => button.style === 'cancel')
  const actions = buttons.filter(button => button !== cancel)

  // Só informativo (ex.: um único "OK")
  if (!cancel && actions.length === 1) {
    window.alert(text)
    actions[0].onPress?.()
    return
  }

  if (actions.length === 0) {
    window.alert(text)
    cancel?.onPress?.()
    return
  }

  if (window.confirm(text)) {
    actions[0].onPress?.()
  } else {
    cancel?.onPress?.()
  }
}

export const Alert = {
  alert(
    title: string,
    message?: string,
    buttons?: AlertButton[],
    options?: AlertOptions
  ) {
    if (Platform.OS === 'web') {
      webAlert(title, message, buttons)
      return
    }

    NativeAlert.alert(title, message, buttons, options)
  },
}
