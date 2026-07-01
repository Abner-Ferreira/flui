import { COLORS } from '@/constants/colors'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    paddingTop: 62,
    paddingHorizontal: 22,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: COLORS.graphite,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: '900',
  },

  subtitle: {
    color: 'rgba(255,255,255,0.65)',
    marginTop: 6,
  },

  content: {
    paddingBottom: 100,
    gap: 16,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 6,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.graphite,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.28)',
    padding: 18,
    gap: 16,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(57,255,20,0.10)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '800',
  },

  cardSubtitle: {
    color: 'rgba(255,255,255,0.65)',
    marginTop: 4,
    fontSize: 14,
  },

  faqCard: {
    backgroundColor: COLORS.graphite,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.28)',
    overflow: 'hidden',
  },

  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },

  faqQuestion: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    marginRight: 12,
  },

  faqAnswer: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
    lineHeight: 22,
    paddingHorizontal: 18,
    paddingBottom: 18,
  },

  infoCard: {
    backgroundColor: COLORS.graphite,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.28)',
    alignItems: 'center',
    padding: 24,
  },

  infoText: {
    color: 'rgba(255,255,255,0.72)',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 16,
    fontSize: 14,
  },
})