import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  marker: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.purpleDeep,
    borderWidth: 2,
    borderColor: COLORS.purpleNeon,
    alignItems: 'center',
    justifyContent: 'center',
  },
})