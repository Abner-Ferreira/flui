import { COLORS } from '@/constants/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View } from 'react-native'
import { styles } from './stationMarker'



export function StationMarker() {
  return (
    <View style={styles.marker}>
      <MaterialCommunityIcons name="ev-station" size={24} color={COLORS.white} />
    </View>
  )
}

