import React, { createContext, ReactNode, useState } from 'react';
// import User from '../interfaces/User';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  logged: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [logged] = useState<string>('');

  const authContextData: AuthContextData = {
    logged,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      { children }
    </AuthContext.Provider>
  );
}
