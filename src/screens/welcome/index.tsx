import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

const pages = [
    {
        text: 'Track your expenses',
        description: 'All your spends, credit card, savings and other expenses in one place',
        // image:require('../assets/bill.svg'),
    },
    {
        text: 'Set your budget',
        description: 'Set your daily, weekly monthly and yearly budgets and track them as you go',
        // image:require('../assets/bill.svg'),
    },
    {
        text: 'Manage your finances',
        description: 'Manage your debts and bills easily from one location'
        // image:require('../assets/bill.svg'),
    },
    {
        text: 'Keep track of your savings',
        description: 'Set and track your savings goals very easily',
        // image:require('../assets/bill.svg'),
    }
]
const Welcome = () => {
    const navigation = useNavigation();

    // Create shared values for each element
    const imageOpacity = useSharedValue(0);
    const titleOpacity = useSharedValue(0);
    const descriptionOpacity = useSharedValue(0);
    const buttonOpacity = useSharedValue(0);
    
    // Add scale and translation for more attractive animations
    const imageScale = useSharedValue(0.8);
    const titleTranslateY = useSharedValue(20);
    const descriptionTranslateY = useSharedValue(20);
    const buttonScale = useSharedValue(0.9);
    
    // Animated styles
    const imageAnimatedStyle = useAnimatedStyle(() => ({
        opacity: imageOpacity.value,
        transform: [{ scale: imageScale.value }]
    }));
    
    const titleAnimatedStyle = useAnimatedStyle(() => ({
        opacity: titleOpacity.value,
        transform: [{ translateY: titleTranslateY.value }]
    }));
    
    const descriptionAnimatedStyle = useAnimatedStyle(() => ({
        opacity: descriptionOpacity.value,
        transform: [{ translateY: descriptionTranslateY.value }]
    }));
    
    const buttonAnimatedStyle = useAnimatedStyle(() => ({
        opacity: buttonOpacity.value,
        transform: [{ scale: buttonScale.value }]
    }));
    
    useEffect(() => {
        // Animation timing constants
        const duration = 800;
        const delayIncrement = 600;
        
        // Start image animation immediately
        imageOpacity.value = withTiming(1, { duration, easing: Easing.out(Easing.quad) });
        imageScale.value = withTiming(1, { duration, easing: Easing.out(Easing.back()) });
        
        // Title animation after a delay
        titleOpacity.value = withDelay(delayIncrement, 
            withTiming(1, { duration, easing: Easing.out(Easing.quad) })
        );
        titleTranslateY.value = withDelay(delayIncrement,
            withTiming(0, { duration, easing: Easing.out(Easing.back()) })
        );
        
        // Description animation with further delay
        descriptionOpacity.value = withDelay(delayIncrement * 2, 
            withTiming(1, { duration, easing: Easing.out(Easing.quad) })
        );
        descriptionTranslateY.value = withDelay(delayIncrement * 2,
            withTiming(0, { duration, easing: Easing.out(Easing.back()) })
        );
        
        // Button animation last
        buttonOpacity.value = withDelay(delayIncrement * 3, 
            withTiming(1, { duration, easing: Easing.out(Easing.quad) })
        );
        buttonScale.value = withDelay(delayIncrement * 3,
            withTiming(1, { duration, easing: Easing.out(Easing.back(3)) })
        );
    }, []);
    
    const handleNavigationToHome = () => {
        navigation.navigate('Home')
    }
    return (
        <SafeAreaView className='flex-1 bg-secondary'>
            <View className='flex-1 items-center justify-center gap-8'>
                <Animated.View style={imageAnimatedStyle}>
                    <Image 
                        source={require('/../../../Users/apple/GitHub/native/Expo/folio/assets/TechLife.png')} 
                        className='w-50 h-50 rounded-md'
                    />
                </Animated.View>
                
                <Animated.Text 
                    className='text-5xl font-[700px] text-tertiary italic' 
                    style={titleAnimatedStyle}
                >
                    Folio
                </Animated.Text>
                
                <Animated.Text 
                    className='text-xl font-bold text-tertiary text-center px-8' 
                    style={descriptionAnimatedStyle}
                >
                    Let's get started with tracking your expenses
                </Animated.Text>
                
                <Animated.View style={buttonAnimatedStyle}>
                    <TouchableOpacity onPress={handleNavigationToHome} className='bg-tertiary px-4 py-2 rounded-md w-[340px] items-center'>
                        <Text className='text-3xl font-normal text-primary'>Get Started</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
};

export default Welcome;