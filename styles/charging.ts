import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    paddingTop: 62,
    paddingHorizontal: 22,
  },

  title: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: '900',
  },

  subtitle: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 15,
    marginTop: 6,
    marginBottom: 24,
  },

  permissionContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },

  permissionTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 18,
  },

  permissionText: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    marginTop: 10,
  },

  permissionButton: {
    height: 54,
    borderRadius: 18,
    backgroundColor: COLORS.purpleNeon,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    marginTop: 24,
  },

  permissionButtonText: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 15,
  },

  scannerCard: {
    height: 320,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: COLORS.purpleNeon,
    backgroundColor: COLORS.graphite,
    shadowColor: COLORS.purpleNeon,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 16,
  },

  camera: {
    flex: 1,
  },

  scannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(72,11,117,0.18)',
  },

  cornerTopLeft: {
    position: 'absolute',
    top: 58,
    left: 58,
    width: 42,
    height: 42,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: COLORS.greenNeon,
    borderTopLeftRadius: 12,
  },

  cornerTopRight: {
    position: 'absolute',
    top: 58,
    right: 58,
    width: 42,
    height: 42,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: COLORS.greenNeon,
    borderTopRightRadius: 12,
  },

  cornerBottomLeft: {
    position: 'absolute',
    bottom: 58,
    left: 58,
    width: 42,
    height: 42,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: COLORS.greenNeon,
    borderBottomLeftRadius: 12,
  },

  cornerBottomRight: {
    position: 'absolute',
    bottom: 58,
    right: 58,
    width: 42,
    height: 42,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: COLORS.greenNeon,
    borderBottomRightRadius: 12,
  },

  scannerTextBox: {
    position: 'absolute',
    bottom: 18,
    left: 18,
    right: 18,
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.62)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 14,
  },

  scannerText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },

  manualCard: {
    marginTop: 22,
    backgroundColor: COLORS.graphite,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(183,72,251,0.24)',
    padding: 18,
  },

  label: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
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

  startButton: {
    marginTop: 22,
    height: 58,
    borderRadius: 20,
    backgroundColor: COLORS.purpleNeon,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  startButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '900',
  },

  chargingCard: {
    marginTop: 22,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(57,255,20,0.35)',
    backgroundColor: 'rgba(57,255,20,0.08)',
    padding: 18,
  },

  chargingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  chargingTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '900',
  },

  chargingSubtitle: {
    color: 'rgba(255,255,255,0.65)',
    marginTop: 4,
  },

  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
    marginTop: 18,
  },

  progressFill: {
    width: '45%',
    height: '100%',
    backgroundColor: COLORS.greenNeon,
    borderRadius: 999,
  },

  finishButton: {
    height: 50,
    borderRadius: 16,
    backgroundColor: COLORS.greenNeon,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },

  finishButtonText: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: '900',
  },

  scanAgainButton: {
    alignItems: 'center',
    marginTop: 18,
  },

  scanAgainText: {
    color: COLORS.greenNeon,
    fontSize: 14,
    fontWeight: '800',
  },
})