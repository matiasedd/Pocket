import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';

import { AuthProvider } from './src/contexts/AuthContext';
import Routes from './src/routes';

export default function App() {
  const [loadedFonts] = useFonts({ Poppins_700Bold, Poppins_400Regular });

  return loadedFonts ? (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  ) : <AppLoading />;
}
