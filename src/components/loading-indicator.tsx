// import { View, Text } from 'react-native'
// import React, { useEffect } from 'react'
// import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'

// const LoadingIndicator = () => {
//     const opacity = useSharedValue(0.5)

//     useEffect(()=>{
//         opacity.value = withRepeat(withTiming(1,{duration:800}),-1,true)
//     },[])
//     const animatedStyle = useAnimatedStyle(()=>{
//         return{
//             opacity:opacity.value
//         }
//     })
//   return (
//     <Animated.View style={[{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'blue' }, animatedStyle]} />
//   )
// }

// export default LoadingIndicator

import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const FloatingDot = ({ delay }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10,
          duration: 500,
          delay: delay,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [delay, translateY]);

  return (
    <Animated.View style={[styles.dot, { transform: [{ translateY }] }]} />
  );
};

function CustomFloatingDotsLoader() {
  return (
    <View style={styles.container}>
      <FloatingDot delay={0} />
      <FloatingDot delay={150} />
      <FloatingDot delay={300} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
});

export default CustomFloatingDotsLoader;