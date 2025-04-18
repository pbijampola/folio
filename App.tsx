import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import './global.css'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/stackNav';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';

export default function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
