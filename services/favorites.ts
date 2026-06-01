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

  list: {
    paddingBottom: 120,
    gap: 14,
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

  emptyCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.25)',
    backgroundColor: COLORS.graphite,
    padding: 30,
    alignItems: 'center',
  },

  emptyTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 14,
  },

  emptyText: {
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },

  card: {
    minHeight: 92,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.28)',
    backgroundColor: COLORS.graphite,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: 'rgba(57,255,20,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    flex: 1,
  },

  stationName: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },

  stationMeta: {
    color: COLORS.greenNeon,
    fontSize: 13,
    marginTop: 4,
  },

  stationDistance: {
    color: 'rgba(255,255,255,0.65)',
    marginTop: 4,
  },
})