'use client';

import { createContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/utils/helpers/logout';

export const initialAuthData = {
  auth: false,
  name: '',
  email: '',
};

export const AuthContext = createContext(null);

export const AuthManager = ({ children, isAuthorized }) => {
  const [authData, setAuthData] = useState({
    ...initialAuthData,
    auth: isAuthorized,
  });

  const router = useRouter();

  const onLogout = () => {
    logout();
    setAuthData(initialAuthData);
    router.push('/signin');
  };

  const onLogin = (name, email) => {
    setAuthData({ auth: true, name, email });
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthData, onLogout, onLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
