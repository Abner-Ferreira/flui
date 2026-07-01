import { COLORS } from '@/constants/colors'
import { styles } from '@/styles/payments'
import {
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { router } from 'expo-router'
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native'

const payments = [
  {
    id: '1',
    station: 'EcoCharge Paulista',
    date: '21 Jul 2026',
    value: 'R$ 42,90',
  },
  {
    id: '2',
    station: 'Shopping Eldorado',
    date: '18 Jul 2026',
    value: 'R$ 31,50',
  },
  {
    id: '3',
    station: 'Charge Park Vila Olímpia',
    date: '12 Jul 2026',
    value: 'R$ 26,40',
  },
]

export default function PaymentsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather
            name="chevron-left"
            size={24}
            color={COLORS.white}
          />
        </Pressable>

        <View>
          <Text style={styles.title}>Pagamentos</Text>

          <Text style={styles.subtitle}>
            Gerencie seus pagamentos
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <Text style={styles.sectionTitle}>
          Método Principal
        </Text>

        <View style={styles.creditCard}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="credit-card-outline"
              size={34}
              color={COLORS.white}
            />

            <Text style={styles.cardBrand}>
              Mastercard
            </Text>
          </View>

          <Text style={styles.cardNumber}>
            •••• •••• •••• 4598
          </Text>

          <Text style={styles.cardName}>
            Abner Ferreira
          </Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() =>
            Alert.alert(
              'Em breve',
              'Adicionar novos cartões estará disponível em breve.'
            )
          }
        >
          <Feather
            name="plus-circle"
            size={22}
            color={COLORS.greenNeon}
          />

          <Text style={styles.addButtonText}>
            Adicionar método de pagamento
          </Text>
        </Pressable>

        <Text style={styles.sectionTitle}>
          Resumo
        </Text>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>
              R$ 100,80
            </Text>

            <Text style={styles.summaryLabel}>
              Últimos 30 dias
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>
              3
            </Text>

            <Text style={styles.summaryLabel}>
              Recargas
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Histórico
        </Text>

        {payments.map(payment => (
          <View
            key={payment.id}
            style={styles.paymentCard}
          >
            <View style={styles.paymentIcon}>
              <MaterialCommunityIcons
                name="ev-station"
                size={26}
                color={COLORS.greenNeon}
              />
            </View>

            <View style={styles.paymentInfo}>
              <Text style={styles.station}>
                {payment.station}
              </Text>

              <Text style={styles.date}>
                {payment.date}
              </Text>
            </View>

            <Text style={styles.value}>
              {payment.value}
            </Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>
          Benefícios
        </Text>

        <View style={styles.benefitsCard}>
          <MaterialCommunityIcons
            name="gift-outline"
            size={38}
            color={COLORS.greenNeon}
          />

          <Text style={styles.benefitTitle}>
            Ganhe descontos
          </Text>

          <Text style={styles.benefitText}>
            Utilize pagamentos pelo aplicativo
            para receber promoções e benefícios
            exclusivos em futuras versões.
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}