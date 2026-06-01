import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.black,
  },

  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 68,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },

  brandArea: {
    alignItems: 'center',
  },

  bolt: {
    width: 62,
    height: 62,
    marginBottom: 8,
  },

  logo: {
    color: COLORS.white,
    fontSize: 56,
    fontWeight: '900',
    letterSpacing: 10,

    textShadowColor: COLORS.purpleNeon,
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 18,
  },

  logoSubtitle: {
    color: COLORS.greenNeon,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 4,
    marginTop: 2,
  },

  heroText: {
    alignItems: 'center',
    marginTop: -10,
  },

  title: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
  },

  subtitle: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
    textAlign: 'center',
    paddingHorizontal: 14,
  },

  form: {
    gap: 16,
  },

  fieldGroup: {
    gap: 8,
  },

  label: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },

  inputBox: {
    height: 58,
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

  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -4,
  },

  forgotText: {
    color: COLORS.purpleNeon,
    fontSize: 14,
    fontWeight: '700',
  },

  button: {
    height: 58,
    borderRadius: 18,
    overflow: 'hidden',

    marginTop: 10,

    shadowColor: COLORS.purpleNeon,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.45,
    shadowRadius: 18,

    elevation: 16,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
  },

  footerLink: {
    alignItems: 'center',
    marginTop: 8,
  },

  footerText: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 15,
  },

  footerStrong: {
    color: COLORS.greenNeon,
    fontWeight: '800',
  },
})