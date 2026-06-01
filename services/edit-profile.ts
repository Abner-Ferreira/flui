import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    paddingTop: 62,
    paddingHorizontal: 22,
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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 26,
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: COLORS.graphite,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.24)',
  },

  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '900',
  },

  subtitle: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 14,
    marginTop: 4,
  },

  card: {
    alignItems: 'center',
    backgroundColor: COLORS.graphite,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.32)',
    padding: 24,
    marginBottom: 24,
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: COLORS.purpleDeep,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  userName: {
    color: COLORS.white,
    fontSize: 21,
    fontWeight: '900',
  },

  userEmail: {
    color: 'rgba(255,255,255,0.65)',
    marginTop: 6,
  },

  form: {
    backgroundColor: COLORS.graphite,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.24)',
    padding: 18,
    gap: 16,
  },

  fieldGroup: {
    gap: 8,
  },

  label: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },

  inputBox: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.45)',
    backgroundColor: 'rgba(14,14,14,0.84)',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  input: {
    flex: 1,
    color: COLORS.white,
    fontSize: 15,
  },

  footer: {
    marginTop: 'auto',
    paddingBottom: 32,
    flexDirection: 'row',
    gap: 12,
  },

  cancelButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
  },

  saveButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.purpleNeon,
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveButtonDisabled: {
    opacity: 0.7,
  },

  saveText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '900',
  },
})