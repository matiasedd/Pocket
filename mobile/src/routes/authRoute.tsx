import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import fonts from '../assets/fonts';
import colors from '../assets/colors';

export default function AuthRoute() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitleAlign: 'left',
          title: 'Bem vindo, Usuário',
          headerTitleStyle: {
            fontFamily: fonts.regular,
            fontSize: 18,
            marginLeft: 18,
            color: colors.light.text_on_primary,
          },
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.light.primary_light,
          },
          headerRight: () => (
            <Entypo
              name="adjust"
              size={24}
              color="black"
              style={{ marginRight: 24 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
