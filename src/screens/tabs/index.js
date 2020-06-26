import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
import Orders from './orders'
import Profile from './profile'
import Restaurant from './restaurant'

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Restaurant" component={Restaurant} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}