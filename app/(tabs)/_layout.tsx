import { COLORS } from '@/constants/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const TAB_ITEMS: Record<string, { title: string; icon: any; isCenter?: boolean }> = {
  index: {
    title: 'Início',
    icon: 'home-outline',
  },
  vehicles: {
    title: 'Veículos',
    icon: 'car-electric',
  },
  more: {
    title: '',
    icon: 'lightning-bolt',
    isCenter: true,
  },
  charging: {
    title: 'Carregar',
    icon: 'ev-station',
  },
  profile: {
    title: 'Perfil',
    icon: 'account-circle-outline',
  },
}

function CustomTabBar({ state, navigation }: any) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const focused = state.index === index
          const item = TAB_ITEMS[route.name]

          if (!item) return null

          return (
            <Pressable
              key={route.key}
              style={styles.tabItem}
              onPress={() => navigation.navigate(route.name)}
            >
              <View style={[styles.iconBox, item.isCenter && styles.centerBox]}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={item.isCenter ? 32 : 24}
                  color={
                    item.isCenter
                      ? COLORS.white
                      : focused
                        ? COLORS.purpleNeon
                        : 'rgba(255,255,255,0.38)'
                  }
                />
              </View>

              {!item.isCenter && (
                <Text style={[styles.label, focused && styles.activeLabel]}>
                  {item.title}
                </Text>
              )}
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="vehicles" />
      <Tabs.Screen name="more" />
      <Tabs.Screen name="charging" />
      <Tabs.Screen name="profile" />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5,5,12,0.98)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(183,72,251,0.18)',
  },

  tabBar: {
    height: 88,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 22,
    paddingTop: 10,
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  iconBox: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerBox: {
    width: 64,
    height: 64,
    borderRadius: 999,
    marginTop: -34,
    backgroundColor: COLORS.purpleDeep,
    borderWidth: 2,
    borderColor: COLORS.purpleNeon,
    shadowColor: COLORS.purpleNeon,
    shadowOpacity: 1,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  label: {
    color: 'rgba(255,255,255,0.38)',
    fontSize: 11,
    fontWeight: '600',
  },

  activeLabel: {
    color: COLORS.purpleNeon,
  },
})