import { COLORS } from '@/constants/colors'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 110,
    maxHeight: '58%',
    borderWidth: 1.4,
    borderColor: COLORS.purpleNeon,
    backgroundColor: COLORS.graphite,
    borderRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 20,
    shadowColor: COLORS.purpleNeon,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 20,
  },

  scrollContent: {
    paddingBottom: 24,
  },

  handle: {
    width: 42,
    height: 4,
    borderRadius: 999,
    backgroundColor: COLORS.purpleNeon,
    alignSelf: 'center',
    marginBottom: 18,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },

  titleWrapper: {
    flex: 1,
  },

  title: {
    color: COLORS.white,
    fontSize: 21,
    fontWeight: '700',
    marginBottom: 10,
  },

  rating: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },

  text: {
    color: COLORS.white,
    fontSize: 13,
    opacity: 0.85,
  },

  timeBox: {
    alignItems: 'center',
    gap: 4,
  },

  time: {
    color: COLORS.greenNeon,
    fontSize: 12,
    fontWeight: '700',
  },

  chargeBadge: {
    marginTop: 18,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.purpleNeon,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.purpleDeep,
  },

  chargeBadgeText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },

  details: {
    marginTop: 18,
    gap: 10,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  detail: {
    color: COLORS.white,
    fontSize: 13,
    opacity: 0.88,
  },

  connectorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
  },

  connectorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.greenNeon,
    backgroundColor: 'rgba(57,255,20,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },

  connectorText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },

  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
  },

  amenityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.purpleNeon,
    backgroundColor: COLORS.purpleDeep,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },

  amenityText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },

  actionsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },

  favoriteButton: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    backgroundColor: COLORS.purpleDeep,
    borderWidth: 1,
    borderColor: COLORS.purpleNeon,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  favoriteButtonActive: {
    backgroundColor: '#ff4d6d',
    borderColor: '#ff4d6d',
  },

  reviewButton: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    backgroundColor: 'rgba(57,255,20,0.12)',
    borderWidth: 1,
    borderColor: COLORS.greenNeon,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  actionButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },

  button: {
    marginTop: 22,
    marginBottom: 8,
    height: 50,
    borderRadius: 14,
    backgroundColor: COLORS.purpleNeon,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: COLORS.purpleNeon,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 12,
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.76)',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },

  reviewModal: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.purpleNeon,
    backgroundColor: COLORS.graphite,
    padding: 20,
  },

  modalTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '900',
  },

  modalSubtitle: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 22,
  },

  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 22,
  },

  reviewInput: {
    minHeight: 92,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.45)',
    backgroundColor: 'rgba(14,14,14,0.84)',
    padding: 14,
    color: COLORS.white,
    textAlignVertical: 'top',
  },

  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },

  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    color: COLORS.white,
    fontWeight: '800',
  },

  sendButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.purpleNeon,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sendText: {
    color: COLORS.white,
    fontWeight: '900',
  },
})