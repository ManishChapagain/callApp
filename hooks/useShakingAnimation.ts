import { useRef, useState } from "react";
import { Animated, Easing } from "react-native";
import * as Haptics from "expo-haptics";

export function useShakingAnimation() {
  const [isShaking, setisShaking] = useState(false);

  // Animation values
  const popUpScale = useRef(new Animated.Value(0)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const softHapticVibration = () => {
    Haptics.selectionAsync();
  };

  // Create a repeating shake animation
  const startShakeAnimation = () => {
    shakeAnimation.addListener(({ value }) => {
      if (value === -10 || value === 10) {
        softHapticVibration(); // Trigger haptic feedback when hitting the border
      }
    });
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: -10, // Move counterclockwise (left)
          duration: 150,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 10, // Move clockwise (right)
          duration: 150,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10, // Back counterclockwise (smaller angle)
          duration: 150,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 10, // Smaller clockwise movement
          duration: 150,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // Start recording and animations
  const startShaking = () => {
    setisShaking(true);

    // Pop up animation
    Animated.timing(popUpScale, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.back(1.5)),
    }).start(() => {
      // Start shake animation after pop-up is complete
      startShakeAnimation();

      // Fade in the "Connecting..." text
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  // Stop recording and reset animations
  const stopShaking = () => {
    setisShaking(false);

    // Reset all animations
    Animated.parallel([
      Animated.timing(popUpScale, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Stop the shake animation
    shakeAnimation.stopAnimation();
    shakeAnimation.setValue(0);
    shakeAnimation.removeAllListeners();
  };

  // Calculate the shake translation
  const shakeInterpolation = shakeAnimation.interpolate({
    inputRange: [-10, 10],
    outputRange: ["-7deg", "7deg"], // Rotates back and forth
  });

  return {
    isShaking,
    startShaking,
    stopShaking,
    popUpScale,
    fadeAnim,
    shakeInterpolation,
  };
}
