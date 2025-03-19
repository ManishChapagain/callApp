import React, { useEffect, useRef } from "react";
import { View, Text, Animated, ImageBackground, Easing } from "react-native";
import { styles } from "@/styles/homeStyles";
import { ConnectingButton } from "@/components/TalkButton";

export const ConnectingPopup = ({
  isVisible,
  friend,
  popUpScale,
  shakeInterpolation,
}: any) => {
  if (!isVisible) return null;

  return (
    <>
      <View style={styles.blackOverlay} />
      <Animated.View
        pointerEvents="auto"
        style={[
          styles.popupContainer,
          {
            transform: [{ scale: popUpScale }, { rotate: shakeInterpolation }],
            opacity: popUpScale,
          },
        ]}
      >
        <ImageBackground
          source={friend.bg}
          style={styles.popupImage}
          resizeMode="cover"
          blurRadius={5}
        >
          <View style={styles.popupOverlay} />
        </ImageBackground>
      </Animated.View>
    </>
  );
};

export const ConnectingStatus = ({ isVisible, canConnect }: any) => {
  if (!isVisible) return null;

  if (canConnect) {
    return (
      <View style={styles.connectingContainer}>
        <Text style={styles.connectingText}>connecting</Text>
        <ConnectingButton />
      </View>
    );
  }

  return <ConnectingFailStatus />;
};

export const ConnectingFailStatus = () => {
  const fadeTextAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [showNewMessage, setShowNewMessage] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Fade out old text
      Animated.timing(fadeTextAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setShowNewMessage(true);

        // Slide in new text
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.notConnectingContainer}>
      <Text style={styles.connectingText}>connecting</Text>
      <View style={styles.notConnectingTextContainer}>
        {!showNewMessage ? (
          <>
            <Animated.Text
              style={[styles.notConnectingText, { opacity: fadeTextAnim }]}
            >
              😢 looks like your friend's
            </Animated.Text>
            <Animated.Text
              style={[styles.notConnectingText, { opacity: fadeTextAnim }]}
            >
              connection sucks
            </Animated.Text>
          </>
        ) : (
          <>
            <Animated.Text
              style={[
                styles.notConnectingText,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              having trouble finding
            </Animated.Text>
            <Animated.Text
              style={[
                styles.notConnectingText,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              your friend...
            </Animated.Text>
          </>
        )}
      </View>
      <ConnectingButton />
    </View>
  );
};
