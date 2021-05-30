import React, { useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppRoute from './appRoute';
import AuthRoute from './authRoute';
import { AuthContext } from '../contexts/AuthContext';

export default function Routes() {
  const { logged } = useContext(AuthContext);

  const [user] = useState<boolean>(logged);

  return (
    <NavigationContainer>
      { user ? <AuthRoute /> : <AppRoute /> }
    </NavigationContainer>
  );
}
