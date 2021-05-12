import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../screens/Landing';
import Login from '../screens/Login';

export default function StackRoute() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
