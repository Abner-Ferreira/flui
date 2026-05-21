import { COLORS } from '@/constants/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { styles } from './styles'

type Props = {
  selected: string[]
  onToggle: (filter: string) => void
}

const filterGroups = [
  {
    title: 'Status',
    icon: 'check-circle-outline',
    filters: ['Disponível agora'],
  },
  {
    title: 'Tipo de carga',
    icon: 'lightning-bolt-outline',
    filters: ['Carga rápida', 'Carga normal'],
  },
  {
    title: 'Conector',
    icon: 'ev-plug-type2',
    filters: ['CCS2', 'CHAdeMO', 'Tipo 1', 'Tipo 2'],
  },
  {
    title: 'Potência',
    icon: 'speedometer',
    filters: ['50kW+', '150kW+'],
  },
  {
    title: 'Comodidades',
    icon: 'coffee-outline',
    filters: ['Wi-Fi', 'Café', 'Banheiro', 'Estacionamento'],
  },
]

export function FilterChips({ selected, onToggle }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.wrapper}
    >
      {filterGroups.map(group => (
        <View key={group.title} style={styles.group}>
          <View style={styles.groupHeader}>
            <MaterialCommunityIcons
              name={group.icon as any}
              size={14}
              color={COLORS.greenNeon}
            />
            <Text style={styles.groupTitle}>{group.title}</Text>
          </View>

          <View style={styles.chips}>
            {group.filters.map(filter => {
              const active = selected.includes(filter)

              return (
                <Pressable
                  key={filter}
                  onPress={() => onToggle(filter)}
                  style={[styles.chip, active && styles.activeChip]}
                >
                  <Text style={[styles.text, active && styles.activeText]}>
                    {filter}
                  </Text>
                </Pressable>
              )
            })}
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

