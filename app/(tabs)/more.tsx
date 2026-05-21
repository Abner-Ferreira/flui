import { COLORS } from '@/constants/colors'
import { styles } from '@/styles/more'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

const menuItems = [
  {
    title: 'Meu veículo',
    description: 'Cadastre modelo, autonomia e conectores',
    icon: 'car-electric',
    route: '/vehicle',
  },
  // {
  //   title: 'Atividades',
  //   description: 'Veja recargas recentes e trajetos iniciados',
  //   icon: 'history',
  // },
  {
    title: 'Favoritos',
    description: 'Pontos de recarga salvos',
    icon: 'heart-outline',
    route: '/vehicle',
  },
  {
    title: 'Pagamentos',
    description: 'Gerencie cartões e métodos de pagamento',
    icon: 'credit-card-outline',
    route: '/vehicle',
  },
  {
    title: 'Configurações',
    description: 'Preferências do aplicativo',
    icon: 'cog-outline',
    route: '/vehicle',
  },
  {
    title: 'Ajuda e suporte',
    description: 'Dúvidas, atendimento e suporte',
    icon: 'help-circle-outline',
    route: '/vehicle',
  },
]

export default function MoreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mais opções</Text>
      <Text style={styles.subtitle}>
        Gerencie seu veículo, atividades e preferências.
      </Text>

      <View style={styles.menu}>
        {menuItems.map(item => (
          <Pressable
            key={item.title}
            style={styles.card}
            onPress={() => router.push(item.route as any)}
          >
            <View style={styles.iconBox}>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={26}
                color={COLORS.greenNeon}
              />
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>

            <Feather name='chevron-right' size={22} color={COLORS.white} />
          </Pressable>
        ))}
      </View>
    </View>
  )
}
