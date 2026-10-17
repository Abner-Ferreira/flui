import { COLORS } from '@/constants/colors'
import { styles } from '@/styles/settings'
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from 'react-native'
import { Alert } from '@/lib/alert'

function SettingItem({
  icon,
  title,
  subtitle,
  right,
  onPress,
}: {
  icon: keyof typeof Feather.glyphMap
  title: string
  subtitle?: string
  right?: React.ReactNode
  onPress?: () => void
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Feather
          name={icon}
          size={22}
          color={COLORS.purpleNeon}
        />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>

        {subtitle && (
          <Text style={styles.cardSubtitle}>
            {subtitle}
          </Text>
        )}
      </View>

      {right}
    </Pressable>
  )
}

export default function SettingsScreen() {
  const [notifications, setNotifications] =
    useState(true)

  const [location, setLocation] = useState(true)

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
          <Text style={styles.title}>
            Configurações
          </Text>

          <Text style={styles.subtitle}>
            Personalize sua experiência
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <Text style={styles.sectionTitle}>
          Conta
        </Text>

        <SettingItem
          icon="user"
          title="Editar Perfil"
          subtitle="Atualize seus dados"
          onPress={() =>
            router.push('/edit-profile')
          }
        />

        <SettingItem
          icon="lock"
          title="Alterar Senha"
          subtitle="Disponível em breve"
          onPress={() =>
            Alert.alert(
              'Em breve',
              'Este recurso estará disponível em futuras versões.'
            )
          }
        />

        <Text style={styles.sectionTitle}>
          Preferências
        </Text>

        <SettingItem
          icon="map-pin"
          title="Localização"
          subtitle="Permitir localização em tempo real"
          right={
            <Switch
              value={location}
              onValueChange={setLocation}
              thumbColor={COLORS.white}
              trackColor={{
                true: COLORS.purpleNeon,
                false: '#555',
              }}
            />
          }
        />

        <SettingItem
          icon="bell"
          title="Notificações"
          subtitle="Receber novidades e avisos"
          right={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              thumbColor={COLORS.white}
              trackColor={{
                true: COLORS.purpleNeon,
                false: '#555',
              }}
            />
          }
        />

        <Text style={styles.sectionTitle}>
          Informações
        </Text>

        <SettingItem
          icon="shield"
          title="Política de Privacidade"
          subtitle="Como tratamos seus dados"
          onPress={() =>
            router.push('/(tabs)/vehicles')
          }
        />

        <SettingItem
          icon="file-text"
          title="Termos de Uso"
          subtitle="Conheça nossas políticas"
          onPress={() =>
            router.push('/(tabs)/vehicles')
          }
        />

        <SettingItem
          icon="info"
          title="Sobre o aplicativo"
          subtitle="Versão 1.0.0"
        />

        <View style={styles.aboutCard}>
          <MaterialCommunityIcons
            name="car-electric"
            size={40}
            color={COLORS.greenNeon}
          />

          <Text style={styles.aboutTitle}>
            FLUI
          </Text>

          <Text style={styles.aboutSubtitle}>
            Mobilidade Elétrica
          </Text>

          <Text style={styles.aboutText}>
            Aplicativo desenvolvido para facilitar
            a localização de estações de recarga para
            veículos elétricos, oferecendo uma
            experiência rápida, intuitiva e segura.
          </Text>

          <View style={styles.versionBadge}>
            <Ionicons
              name="sparkles"
              size={16}
              color={COLORS.greenNeon}
            />

            <Text style={styles.versionText}>
              Versão 1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}