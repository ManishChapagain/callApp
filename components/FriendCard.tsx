import React from "react";
import { View, Text, ImageBackground, Animated } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import { styles } from "@/styles/homeStyles";
import { TalkButton } from "@/components/TalkButton";
import { ConnectedUI } from "@/components/ConnectedUI";
import { CallControls } from "@/components/CallControls";

export const FriendCard = ({
  friend,
  isConnected,
  inCall,
  combinedGesture,
  animatedStyle,
  onEndCall,
}: any) => {
  return (
    <ImageBackground source={friend.bg} style={styles.card} resizeMode="cover">
      <View style={styles.overlay}>
        {!inCall && (
          <View style={styles.contentContainer}>
            {!isConnected && (
              <Text style={styles.friendName}>{friend.name}</Text>
            )}
            {isConnected && <ConnectedUI />}
            <GestureDetector gesture={combinedGesture}>
              <Animated.View style={[styles.draggable, animatedStyle]}>
                <TalkButton friendBg={friend.bg} isConnected={isConnected} />
              </Animated.View>
            </GestureDetector>
          </View>
        )}
        {inCall && <CallControls onEndCall={onEndCall} />}
      </View>
    </ImageBackground>
  );
};
