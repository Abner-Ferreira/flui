import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '@/constants/colors'
import { AppHeader } from '@/components/ui/AppHeader'

export default function VehicleScreen() {
  return (
    <View style={styles.container}>
      <AppHeader title="Meu veículo" />

      <View style={styles.content}>
        <Text style={styles.title}>Meu veículo</Text>
        <Text style={styles.subtitle}>
          Cadastre seu carro, autonomia e conectores compatíveis.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  content: {
    paddingTop: 32,
    paddingHorizontal: 22,
  },
  title: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.white,
    opacity: 0.7,
    marginTop: 8,
    fontSize: 15,
  },
})