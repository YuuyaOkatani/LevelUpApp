import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

export const ProgressBar = ({ progress }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 500, // tempo da animação em ms
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolated = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Animated.View
          style={[styles.progress, { width: widthInterpolated }]}
        />
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  progressBar: {
    width: '100%',
    height: 20,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 5,
    
  },
  progress: {
    height: '100%',
    
    backgroundColor: 'white',
    borderRadius: 10,
  },
  label: { marginTop: 8, fontSize: 16, color: 'white' },
});

export default ProgressBar;
