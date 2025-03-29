import { useEffect, useRef, useState } from "react";
import { StatusBar, SafeAreaView } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { useShakingAnimation } from "@/hooks/useShakingAnimation";
import { Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import {
  SourceSans3_700Bold,
  useFonts,
} from "@expo-google-fonts/source-sans-3";
import { SplashScreen } from "expo-router";
import { friends } from "@/constants/friends.constants";
import { FriendCard } from "@/components/FriendCard";
import { styles } from "@/styles/homeStyles";
import {
  ConnectingPopup,
  ConnectingStatus,
} from "@/components/ConnectingOverlay";

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [loaded, error] = useFonts({
    SourceSans3_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [isHoldPressed, setIsHoldPressed] = useState(false);

  // Use a ref to track the friend ID currently being connected to
  const connectingFriendIdRef = useRef<string | null>();

  // Use the custom hook
  const {
    isShaking,
    startShaking,
    stopShaking,
    popUpScale,
    fadeAnim,
    shakeInterpolation,
  } = useShakingAnimation();

  // Reset all states when friend changes
  useEffect(() => {
    setIsConnecting(false);
    setIsConnected(false);
    stopShaking();
    setIsHoldPressed(false);
    connectingFriendIdRef.current = null;
  }, [currentIndex]);

  // todo: implement a backend instead of using delay
  useEffect(() => {
    if (isShaking) {
      // Store the ID of the friend we're trying to connect with
      connectingFriendIdRef.current = friends[currentIndex].id;
      setIsConnecting(true);

      const delay = 6000; // Delay 6 seconds
      const timerId = setTimeout(() => {
        // Only process this timeout if we're still connecting to the same friend
        if (connectingFriendIdRef.current === friends[currentIndex].id) {
          if (!friends[currentIndex].canConnect) {
            setIsConnected(false); // Cannot connect
          } else {
            setIsConnected(true); // Successfully connected
          }
          setIsConnecting(false);
        }
      }, delay);

      return () => {
        // Clear the timeout if component unmounts or dependencies change
        clearTimeout(timerId);
      };
    } else {
      setIsConnecting(false);
      setIsConnected(false);
      connectingFriendIdRef.current = null;
    }
  }, [isShaking, currentIndex]);

  const handleSwipeLeft = () => {
    if (!isShaking && !inCall && currentIndex < friends.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (!isShaking && !inCall && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const [isDraggedUp, setIsDraggedUp] = useState(false);
  const translateY = useSharedValue(0);

  /** Hold Gesture */
  const holdGesture = Gesture.LongPress()
    .minDuration(100) // 100ms to detect hold
    .maxDistance(100)
    .onStart(() => {
      runOnJS(setIsHoldPressed)(true);
      runOnJS(startShaking)();
      runOnJS(setIsDraggedUp)(false);
    })
    .onEnd(() => {
      runOnJS(setIsHoldPressed)(false);
      runOnJS(stopShaking)();
      runOnJS(setIsConnected)(false);
      runOnJS(setIsConnecting)(false);
    });

  /** Drag Gesture */
  const dragGesture = Gesture.Pan()
    .onChange((event) => {
      if (isConnected) {
        if (event.translationY < 0) {
          translateY.value = event.translationY;
        }

        // Check if dragged up by 50px
        if (event.translationY < -50) {
          runOnJS(setIsDraggedUp)(true);
        } else {
          runOnJS(setIsDraggedUp)(false);
        }
      }
    })
    .onEnd(() => {
      translateY.value = withSpring(0);
    });

  // Combine both gestures
  const combinedGesture = Gesture.Simultaneous(holdGesture, dragGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Handle call initiation
  useEffect(() => {
    if (isHoldPressed && isDraggedUp && isConnected) {
      setInCall(true);
      setIsDraggedUp(false);
      setIsConnected(false);
      setIsHoldPressed(false);
      connectingFriendIdRef.current = null;
    }
  }, [isHoldPressed, isDraggedUp, isConnected]);

  const handleEndCall = () => {
    setInCall(false);
  };

  if (!loaded && !error) {
    return null;
  }

  // Ensure UI correctly reflects the current friend's ability to connect
  const currentFriend = friends[currentIndex];
  const canShowConnectedUI =
    isConnected && currentFriend && currentFriend.canConnect;

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <GestureRecognizer
          style={styles.gestureContainer}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        >
          <FriendCard
            friend={currentFriend}
            isConnected={canShowConnectedUI}
            inCall={inCall}
            combinedGesture={combinedGesture}
            animatedStyle={animatedStyle}
            onEndCall={handleEndCall}
          />
        </GestureRecognizer>

        <ConnectingPopup
          isVisible={isShaking && isConnecting}
          friend={currentFriend}
          popUpScale={popUpScale}
          shakeInterpolation={shakeInterpolation}
        />

        <ConnectingStatus
          isVisible={isShaking && isConnecting}
          canConnect={currentFriend.canConnect}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
