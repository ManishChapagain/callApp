import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  gestureContainer: { flex: 1 },
  card: { flex: 1, width: width, height: height },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)" },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: height * 0.3,
  },
  friendName: {
    flex: 1,
    fontSize: 34,
    color: "white",
    top: height * 0.35,
    fontFamily: "SourceSans3_700Bold",
  },
  talkButton: {
    width: 120,
    height: 120,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: "white",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOverlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  blackOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    zIndex: 1,
  },
  popupContainer: {
    position: "absolute",
    top: height * 0.1,
    bottom: height * 0.1,
    alignSelf: "center",
    width: width * 0.8,
    height: height * 0.8,
    borderRadius: 10,

    overflow: "hidden",
    zIndex: 2,
  },
  popupImage: {
    width: "100%",
    height: "100%",
  },
  popupOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  connectingContainer: {
    flex: 1,
    position: "absolute",
    bottom: height * 0.14,
    alignItems: "center",
    alignSelf: "center",
    zIndex: 3,
    gap: 50,
  },
  connectingText: {
    color: "white",
    fontSize: 40,
    fontFamily: "SourceSans3_700Bold",
  },
  notConnectingContainer: {
    flex: 1,
    position: "absolute",
    bottom: height * 0.14,
    alignItems: "center",
    alignSelf: "center",
    zIndex: 3,
    gap: 20,
  },
  notConnectingTextContainer: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
  },
  notConnectingText: {
    color: "white",
    fontSize: 24,
    fontFamily: "SourceSans3_700Bold",
  },
  connectedContainer: {
    flex: 1,
    top: height * 0.25,
    gap: 80,
  },
  connectedText: {
    fontSize: 24,
    color: "white",
    fontFamily: "SourceSans3_700Bold",
  },
  lockWrapper: {
    alignSelf: "center",
    width: 45,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: "center",
    paddingTop: 7,
  },
  draggable: { position: "absolute" },
  smallTalkButton: {
    width: 100,
    height: 100,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: "white",

    justifyContent: "center",
    alignItems: "center",
  },
  borderCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  callContainer: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    alignItems: "center",
  },
  controlsBar: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  controlButton: {
    padding: 10,
  },
  endCallButton: {
    backgroundColor: "red",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
