import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 28,
    borderWidth: 1.4,
    borderColor: COLORS.purpleNeon,
    backgroundColor: COLORS.graphite,
    borderRadius: 14,
    padding: 18,
  },
  handle: {
    width: 42,
    height: 4,
    borderRadius: 8,
    backgroundColor: COLORS.purpleNeon,
    alignSelf: 'center',
    marginBottom: 16,
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
    fontWeight: '600',
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
    marginTop: 16,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.purpleNeon,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
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
    marginTop: 14,
    gap: 5,
  },
  detail: {
    color: COLORS.white,
    fontSize: 12,
    opacity: 0.88,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  connectorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },

  connectorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.greenNeon,
    backgroundColor: 'rgba(57,255,20,0.08)',
    paddingHorizontal: 10,
    paddingVertical: 7,
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
    marginTop: 12,
  },

  amenityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.purpleNeon,
    backgroundColor: COLORS.purpleDeep,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
  },

  amenityText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  button: {
    marginTop: 18,
    height: 44,
    borderRadius: 8,
    backgroundColor: COLORS.purpleNeon,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
  },
})
