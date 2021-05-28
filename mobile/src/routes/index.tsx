import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppRoute from './appRoute';
import AuthRoute from './authRoute';

export default function Routes() {
  const [user] = useState<object | null>({});

  return (
    <NavigationContainer>
      { user ? <AuthRoute /> : <AppRoute /> }
    </NavigationContainer>
  );
}
