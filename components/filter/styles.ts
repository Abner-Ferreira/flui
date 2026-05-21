import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    gap: 14,
    paddingRight: 24,
  },
  group: {
    minWidth: 150,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.purpleNeon,
    backgroundColor: 'rgba(18,18,18,0.94)',
    padding: 10,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  groupTitle: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
    opacity: 0.8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: COLORS.graphite,
    borderWidth: 1,
    borderColor: COLORS.purpleDeep,
  },
  activeChip: {
    backgroundColor: COLORS.purpleDeep,
    borderColor: COLORS.purpleNeon,
  },
  text: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  activeText: {
    color: COLORS.greenNeon,
  },
})