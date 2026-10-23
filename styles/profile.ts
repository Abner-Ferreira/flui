import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

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
  profileScroll: {
  flex: 1,
},
  content: {
    paddingTop: 62,
    paddingHorizontal: 22,
    paddingBottom: 140,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  loadingText: {
    color: COLORS.white,
    opacity: 0.7,
  },

  pageTitle: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: '900',
  },

  pageSubtitle: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 15,
    marginTop: 6,
    marginBottom: 24,
  },

  profileCard: {
    alignItems: 'center',
    backgroundColor: COLORS.graphite,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.32)',
    padding: 24,
  },

  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: COLORS.purpleDeep,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  name: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '900',
  },

  email: {
    color: 'rgba(255,255,255,0.65)',
    marginTop: 6,
  },

  badge: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(57,255,20,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(57,255,20,0.35)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },

  badgeText: {
    color: COLORS.greenNeon,
    fontSize: 12,
    fontWeight: '800',
  },

  section: {
    marginTop: 22,
    backgroundColor: COLORS.graphite,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.24)',
    padding: 18,
    gap: 14,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '900',
  },

  sectionAction: {
    color: COLORS.greenNeon,
    fontSize: 13,
    fontWeight: '800',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(183,72,251,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoLabel: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
  },

  infoValue: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },

  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  vehicleIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: 'rgba(57,255,20,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  vehicleInfo: {
    flex: 1,
  },

  vehicleName: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '900',
  },

  vehicleMeta: {
    color: 'rgba(255,255,255,0.65)',
    marginTop: 4,
  },

  emptyVehicleCard: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.36)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  emptyVehicleText: {
    color: COLORS.purpleNeon,
    fontWeight: '800',
  },

  editButton: {
    marginTop: 22,
    height: 54,
    borderRadius: 18,
    backgroundColor: COLORS.purpleNeon,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  editButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '900',
  },

  logoutButton: {
    marginTop: 14,
    height: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,90,90,0.28)',
    backgroundColor: 'rgba(255,90,90,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  logoutText: {
    color: '#ff5a5a',
    fontSize: 15,
    fontWeight: '900',
  },
})