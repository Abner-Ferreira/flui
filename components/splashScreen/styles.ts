import { COLORS } from "@/constants/colors"
import { Dimensions, StyleSheet } from "react-native"

const { width, height } = Dimensions.get('window')

export const loadingStyles = StyleSheet.create({
  container: {
    width: '80%',
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: '600',
  },
  percent: {
    color: COLORS.greenNeon,
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '700',
    textShadowColor: COLORS.greenNeon,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  track: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
    overflow: 'hidden',
  },
  tipGlow: {
    position: 'absolute',
    top: -4,
    width: 20,
    height: 12,
    backgroundColor: COLORS.greenNeon,
    borderRadius: 6,
    opacity: 0.8,
    shadowColor: COLORS.greenNeon,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
})

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  backgroundContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingTop: height * 0.05,
  },
  heroContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  heroBolt: {
    width: width * 0.34,
    height: width * 0.34,

    maxWidth: 160,
    maxHeight: 160,

    resizeMode: 'contain',

    marginBottom: -20,

    shadowColor: COLORS.purpleNeon,
    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.55,
    shadowRadius: 12,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: width * 0.18,
    fontWeight: '900',
    letterSpacing: 10,
    textShadowColor: 'rgba(255,255,255,0.45)',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 18,
  },
  heroSubtitle: {
    marginTop: 8,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.82)',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '400',
  },
  heroHighlight: {
    color: COLORS.greenNeon,
    fontWeight: '800',
    textShadowColor: COLORS.greenNeon,
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 10,
  },
  bottom: {
    position: 'absolute',
    bottom: 48,
    width: '100%',
    alignItems: 'center',
  },
  particle: {
    position: 'absolute',
    bottom: height * 0.26,
    width: 4,
    height: 4,
    borderRadius: 999,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
})