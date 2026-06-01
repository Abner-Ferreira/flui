import { COLORS } from '@/constants/colors'
import { Activity, getActivities } from '@/services/activities'
import { styles } from '@/styles/activities'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { router, useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View
} from 'react-native'

export default function ActivitiesScreen() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  async function loadActivities() {
    try {
      setLoading(true)
      const data = await getActivities()
      setActivities(data)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadActivities()
    }, [])
  )

  function getIcon(type: Activity['type']) {
    if (type === 'route') return 'navigation'
    if (type === 'charge') return 'zap'
    if (type === 'favorite') return 'heart'
    return 'star'
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={COLORS.greenNeon} />
        <Text style={styles.loadingText}>Carregando atividades...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Feather name="chevron-left" size={24} color={COLORS.white} />
        </Pressable>

        <View>
          <Text style={styles.title}>Atividades</Text>
          <Text style={styles.subtitle}>Seu histórico no FLUI</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {activities.length === 0 ? (
          <View style={styles.emptyCard}>
            <MaterialCommunityIcons
              name="history"
              size={42}
              color={COLORS.purpleNeon}
            />

            <Text style={styles.emptyTitle}>Nenhuma atividade ainda</Text>

            <Text style={styles.emptyText}>
              Suas rotas, recargas e avaliações aparecerão aqui.
            </Text>
          </View>
        ) : (
          activities.map(activity => (
            <View key={activity.id} style={styles.card}>
              <View style={styles.iconBox}>
                <Feather
                  name={getIcon(activity.type) as any}
                  size={22}
                  color={COLORS.greenNeon}
                />
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>

                {activity.description && (
                  <Text style={styles.activityDescription}>
                    {activity.description}
                  </Text>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

