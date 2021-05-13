import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../screens/Landing';
import Login from '../screens/Login';
import fonts from '../assets/fonts';

export default function StackRoute() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Entrar na conta',
          headerStyle: { elevation: 0 },
          headerTitleStyle: { fontFamily: fonts.regular },
        }}
      />
    </Stack.Navigator>
  );
}
