import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface SnackbarProps {
  message: string;
  visible: boolean;
  bgColor:string | null
  onHide: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, visible, onHide, bgColor }) => {
  const translateY = React.useRef(new Animated.Value(200)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0, 
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(translateY, {
            toValue: 200,
            duration: 300,
            useNativeDriver: true,
          }).start(onHide);
        }, 4000);
      });
    } else {
      translateY.setValue(200);
    }
  }, [visible, onHide, translateY]);

  return (
    <Animated.View style={[styles.snackbar, { transform: [{ translateY }], backgroundColor:bgColor? bgColor :'#EE6928' }]}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={onHide}>
          <Feather name="x" size={24} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    bottom: 55,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 5,
    zIndex: 1000,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  message: {
    color: 'white',
    fontWeight: "400",
    fontSize: 14,
  },
});

export default Snackbar;
