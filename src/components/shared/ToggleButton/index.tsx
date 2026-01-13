import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';

interface Props{
    isActive:boolean,
    onPress:()=>void
}

export default function ToggleButton({isActive, onPress}:Props) {

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isActive ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  const circlePosition = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ccc', '#4ade80'],
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.toggleContainer, { backgroundColor }]}>
        <Animated.View style={[styles.circle, { left: circlePosition }]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  toggleContainer: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    padding: 2,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 2,
    elevation: 3,
  },
});
