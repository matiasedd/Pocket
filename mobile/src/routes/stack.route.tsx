import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Landing } from '../screens/Landing';
import { Login } from '../screens/Login';

export function StackRoute() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Landing" component={Landing}/>
      <Stack.Screen name="Login" component={Login}/>
    </Stack.Navigator>
  );
}