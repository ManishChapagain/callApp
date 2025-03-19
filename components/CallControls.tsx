import React from "react";
import { View, Pressable } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { styles } from "@/styles/homeStyles";

export const CallControls = ({ onEndCall }: any) => {
  return (
    <View style={styles.callContainer}>
      <View style={styles.controlsBar}>
        <Pressable style={styles.controlButton}>
          <FontAwesome6 name="chromecast" size={24} color="white" />
        </Pressable>
        <Pressable style={styles.controlButton}>
          <FontAwesome6 name="volume-low" size={24} color="white" />
        </Pressable>
        <Pressable style={styles.controlButton}>
          <FontAwesome6 name="video" size={24} color="white" />
        </Pressable>
        <Pressable style={styles.controlButton}>
          <FontAwesome6 name="microphone-slash" size={24} color="white" />
        </Pressable>
      </View>

      <Pressable style={styles.endCallButton} onPress={onEndCall}>
        <FontAwesome6 name="xmark" size={24} color="white" />
      </Pressable>
    </View>
  );
};
