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
    marginTop: 18,
    marginBottom: 14,
  },

  creditCard: {
    borderRadius: 28,
    padding: 24,
    backgroundColor: COLORS.graphite,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.30)',
    marginBottom: 20,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardBrand: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 18,
  },

  cardNumber: {
    color: COLORS.white,
    fontSize: 22,
    letterSpacing: 2,
    marginTop: 34,
    fontWeight: '700',
  },

  cardName: {
    color: COLORS.greenNeon,
    marginTop: 22,
    fontWeight: '700',
    fontSize: 15,
  },

  addButton: {
    height: 62,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(57,255,20,0.30)',
    backgroundColor: 'rgba(57,255,20,0.08)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },

  addButtonText: {
    color: COLORS.greenNeon,
    fontWeight: '800',
    fontSize: 15,
  },

  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
    marginBottom: 8,
  },

  summaryCard: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: COLORS.graphite,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.28)',
    alignItems: 'center',
    paddingVertical: 22,
  },

  summaryValue: {
    color: COLORS.greenNeon,
    fontSize: 24,
    fontWeight: '900',
  },

  summaryLabel: {
    color: 'rgba(255,255,255,0.65)',
    marginTop: 6,
    textAlign: 'center',
    fontSize: 13,
  },

  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: COLORS.graphite,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.28)',
    padding: 16,
    marginBottom: 14,
  },

  paymentIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(57,255,20,0.10)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  paymentInfo: {
    flex: 1,
  },

  station: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 16,
  },

  date: {
    color: 'rgba(255,255,255,0.60)',
    marginTop: 5,
    fontSize: 13,
  },

  value: {
    color: COLORS.greenNeon,
    fontWeight: '900',
    fontSize: 16,
  },

  benefitsCard: {
    marginTop: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(57,255,20,0.30)',
    backgroundColor: 'rgba(57,255,20,0.08)',
    alignItems: 'center',
    padding: 28,
    marginBottom: 30,
  },

  benefitTitle: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 20,
    marginTop: 16,
  },

  benefitText: {
    color: 'rgba(255,255,255,0.70)',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 14,
    fontSize: 14,
  },
})