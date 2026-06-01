import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const darkMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: COLORS.black }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: COLORS.purpleNeon }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: COLORS.black }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: COLORS.purpleDeep }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: COLORS.purpleNeon }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: COLORS.graphite }],
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
]

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  topContent: {
    position: 'absolute',
    top: 54,
    left: 24,
    right: 24,
    gap: 18,
  },
  searchBox: {
    height: 58,
    borderWidth: 1.5,
    borderColor: COLORS.purpleNeon,
    borderRadius: 10,
    backgroundColor: COLORS.graphite,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: 15,
  },
  feedbackBox: {
  position: 'absolute',
  top: 180,
  alignSelf: 'center',
  backgroundColor: COLORS.graphite,
  borderWidth: 1,
  borderColor: COLORS.purpleNeon,
  borderRadius: 12,
  paddingHorizontal: 16,
  paddingVertical: 12,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
},

feedbackText: {
  color: COLORS.white,
  fontSize: 13,
  fontWeight: '600',
},
})
