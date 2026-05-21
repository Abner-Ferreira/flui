import { Tabs } from 'expo-router'
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import { COLORS } from '@/constants/colors'


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.purpleDeep,
          borderTopWidth: 0,
          height: 82,
          paddingTop: 8,
          paddingBottom: 12,
        },
        tabBarActiveTintColor: COLORS.greenNeon,
        tabBarInactiveTintColor: COLORS.white,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Recarga',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="ev-station" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="activities"
        options={{
          title: 'Atividades',
          tabBarIcon: ({ color, size }) => (
            <Feather name="clock" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="more"
        options={{
          title: 'Mais',
          tabBarIcon: ({ color, size }) => (
            <Feather name="menu" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}