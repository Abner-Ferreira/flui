import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    paddingTop: 58,
    paddingHorizontal: 22,
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.white,
    opacity: 0.7,
    marginTop: 8,
    fontSize: 14,
  },
  menu: {
    marginTop: 28,
    gap: 14,
  },
  card: {
    minHeight: 78,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.purpleNeon,
    backgroundColor: COLORS.graphite,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 14,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.purpleDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  cardDescription: {
    color: COLORS.white,
    opacity: 0.68,
    fontSize: 12,
    marginTop: 4,
  },
})