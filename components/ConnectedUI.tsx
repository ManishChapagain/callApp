import React from "react";
import { View, Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { styles } from "@/styles/homeStyles";

export const ConnectedUI = () => (
  <View style={styles.connectedContainer}>
    <Text style={styles.connectedText}>slide up to lock</Text>
    <View style={styles.lockWrapper}>
      <Entypo name="lock-open" size={24} color="white" />
    </View>
  </View>
);
