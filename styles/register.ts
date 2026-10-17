import { COLORS } from '@/constants/colors'
import { Platform, StyleSheet } from 'react-native'

const isWeb = Platform.OS === 'web'

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    minHeight: isWeb ? 800 : undefined,
    backgroundColor: COLORS.black,
  },

  container: {
    flex: 1,
    width: '100%',
  },

  content: {
    flexGrow: 1,
    width: '100%',
    maxWidth: isWeb ? 520 : undefined,
    alignSelf: 'center',
    paddingHorizontal: 28,
    paddingTop: isWeb ? 32 : 52,
    paddingBottom: 32,
    justifyContent: 'space-between',
    gap: 28,
  },

  brandArea: {
    alignItems: 'center',
  },

  bolt: {
    width: 56,
    height: 56,
    marginBottom: 4,
  },

  logo: {
    color: COLORS.white,
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: 9,
    textShadowColor: COLORS.purpleNeon,
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 18,
  },

  logoSubtitle: {
    color: COLORS.greenNeon,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 3.4,
    marginTop: 2,
  },

  heroText: {
    alignItems: 'center',
    marginTop: 0,
  },

  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },

  subtitle: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 12,
  },

  form: {
    gap: 12,
    width: '100%',
  },

  fieldGroup: {
    gap: 7,
    width: '100%',
  },

  label: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },

  inputBox: {
    height: 52,
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
    minWidth: 0,
    color: COLORS.white,
    fontSize: 15,
  },

  button: {
    height: 54,
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
    marginTop: 6,
  },

  footerText: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 15,
    textAlign: 'center',
  },

  footerStrong: {
    color: COLORS.greenNeon,
    fontWeight: '800',
  },
})
