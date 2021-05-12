import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackRoute from './stackRoute';

export default function Routes() {
  return (
    <NavigationContainer>
      <StackRoute />
    </NavigationContainer>
  );
}
