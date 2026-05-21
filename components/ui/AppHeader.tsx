import { Pressable, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { COLORS } from '@/constants/colors'

type Props = {
  title: string
}

export function AppHeader({ title }: Props) {
  return (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Feather name="chevron-left" size={28} color={COLORS.white} />
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.placeholder} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 96,
    backgroundColor: COLORS.black,
    paddingTop: 48,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.graphite,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.purpleNeon,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
  },
  placeholder: {
    width: 42,
  },
})