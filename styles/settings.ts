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
    paddingBottom: 120,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 20,
    marginBottom: 14,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.28)',
    backgroundColor: COLORS.graphite,
    padding: 16,
    marginBottom: 14,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(183,72,251,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },

  cardSubtitle: {
    color: 'rgba(255,255,255,0.60)',
    marginTop: 4,
    fontSize: 13,
  },

  aboutCard: {
    marginTop: 28,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.28)',
    backgroundColor: COLORS.graphite,
    padding: 28,
    alignItems: 'center',
  },

  aboutTitle: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '900',
    marginTop: 16,
    letterSpacing: 1,
  },

  aboutSubtitle: {
    color: COLORS.greenNeon,
    marginTop: 4,
    fontWeight: '700',
    letterSpacing: 1,
  },

  aboutText: {
    color: 'rgba(255,255,255,0.70)',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 24,
    fontSize: 14,
  },

  versionBadge: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(57,255,20,0.10)',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  versionText: {
    color: COLORS.greenNeon,
    fontWeight: '700',
    fontSize: 14,
  },
})