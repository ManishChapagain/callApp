import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { styles } from "@/styles/homeStyles";

export const TalkButton = ({ friendBg, isConnected }: any) => {
  if (isConnected) {
    return (
      <View style={styles.smallTalkButton}>
        <View style={styles.borderCircle}></View>
      </View>
    );
  }

  return (
    <View style={styles.talkButton}>
      <ImageBackground
        source={friendBg}
        style={styles.buttonImage}
        imageStyle={{ borderRadius: 75 }}
      >
        <View style={styles.buttonOverlay}>
          <Text style={styles.buttonText}>Hold to Talk</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export const ConnectingButton = () => (
  <View style={styles.smallTalkButton}>
    <View style={styles.borderCircle}></View>
  </View>
);
