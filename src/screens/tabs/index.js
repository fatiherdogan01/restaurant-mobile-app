import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
import PastOrders from './past-orders'
import Profile from './profile'
import Restaurants from './restaurants'

export default function Tabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 18,
          fontWeight: '500',
          marginBottom: 'auto',
          marginTop: 'auto'
        }
      }}
    >
      <Tab.Screen name="Past Orders" component={PastOrders} />
      <Tab.Screen name="Restaurants" component={Restaurants} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}