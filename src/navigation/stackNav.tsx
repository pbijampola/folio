import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import Onboarding from "../screens/welcome";
import Welcome from "../screens/welcome";
import BottomNavigation from "./bottomNav";
import AuthScreen from "../screens/auth";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={AuthScreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Home" component={BottomNavigation} />
        </Stack.Navigator>
    );
};
export default StackNavigation;