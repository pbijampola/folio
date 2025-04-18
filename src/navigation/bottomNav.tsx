import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Expense from '../screens/expense';
import { Home as HomeIcon, DollarSign , LayoutDashboard } from 'lucide-react-native';
import ExpensesScreen from '../screens/expense';
import ReportScreen from '../screens/report';
import { Layout } from 'react-native-reanimated';

const Tab = createBottomTabNavigator();


const BottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <HomeIcon color={color} size={24} />
        }} 
      />
      <Tab.Screen 
        name="Expense" 
        component={ExpensesScreen} 
        options={{
          tabBarIcon: ({color}) => <DollarSign color={color} size={24} />
        }} 
      />
      <Tab.Screen 
        name="Report" 
        component={ReportScreen} 
        options={{
          tabBarIcon: ({color}) => <LayoutDashboard color={color} size={24} />
        }} 
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation