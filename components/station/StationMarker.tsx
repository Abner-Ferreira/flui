import { COLORS } from '@/constants/colors'
import { styles } from '@/styles/stationMarker'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View } from 'react-native'



export function StationMarker() {
  return (
    <View style={styles.marker}>
      <MaterialCommunityIcons name="ev-station" size={24} color={COLORS.white} />
    </View>
  )
}

