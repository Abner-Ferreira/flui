import { COLORS } from '@/constants/colors'
import { styles } from '@/styles/help'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native'

type FAQItemProps = {
  question: string
  answer: string
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <View style={styles.faqCard}>
      <Pressable
        style={styles.faqHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.faqQuestion}>{question}</Text>

        <Feather
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={22}
          color={COLORS.purpleNeon}
        />
      </Pressable>

      {expanded && (
        <Text style={styles.faqAnswer}>
          {answer}
        </Text>
      )}
    </View>
  )
}

export default function HelpScreen() {
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
          <Text style={styles.title}>Ajuda & Suporte</Text>
          <Text style={styles.subtitle}>
            Estamos aqui para ajudar você.
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* CONTATO */}

        <Text style={styles.sectionTitle}>
          Contato
        </Text>

        <Pressable
          style={styles.card}
          onPress={() =>
            Linking.openURL('mailto:suporte@flui.com')
          }
        >
          <View style={styles.iconContainer}>
            <Feather
              name="mail"
              size={24}
              color={COLORS.greenNeon}
            />
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              E-mail
            </Text>

            <Text style={styles.cardSubtitle}>
              suporte@flui.com
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() =>
            Linking.openURL('tel:+551140001234')
          }
        >
          <View style={styles.iconContainer}>
            <Feather
              name="phone"
              size={24}
              color={COLORS.greenNeon}
            />
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Telefone
            </Text>

            <Text style={styles.cardSubtitle}>
              (11) 4000-1234
            </Text>
          </View>
        </Pressable>

        {/* FAQ */}

        <Text style={styles.sectionTitle}>
          Perguntas Frequentes
        </Text>

        <FAQItem
          question="Como iniciar uma recarga?"
          answer="Abra um posto de recarga, toque em 'Iniciar Recarga' e escaneie o QR Code disponível na estação."
        />

        <FAQItem
          question="Como adicionar um veículo?"
          answer="Acesse Perfil > Veículos > Adicionar Veículo."
        />

        <FAQItem
          question="Como favoritar um posto?"
          answer="Abra os detalhes do posto e toque no ícone de coração."
        />

        <FAQItem
          question="Como editar meus dados?"
          answer="Acesse Perfil > Editar Perfil e salve as alterações."
        />

        {/* PRIVACIDADE */}

        <Text style={styles.sectionTitle}>
          Privacidade
        </Text>

        <View style={styles.infoCard}>
          <MaterialCommunityIcons
            name="shield-lock-outline"
            size={32}
            color={COLORS.greenNeon}
          />

          <Text style={styles.infoText}>
            Seus dados são utilizados apenas para autenticação,
            gerenciamento de veículos, favoritos e histórico de
            atividades, respeitando as boas práticas de segurança.
          </Text>
        </View>

        {/* SOBRE */}

        <Text style={styles.sectionTitle}>
          Sobre o aplicativo
        </Text>

        <View style={styles.infoCard}>
          <MaterialCommunityIcons
            name="information-outline"
            size={32}
            color={COLORS.purpleNeon}
          />

          <Text style={styles.infoText}>
            Flui{"\n"}
            Versão 1.0.0{"\n\n"}
            Projeto acadêmico desenvolvido para a FIAP,
            com foco em mobilidade elétrica e localização
            de estações de recarga.
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}