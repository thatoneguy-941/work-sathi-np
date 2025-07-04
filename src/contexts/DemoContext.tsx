import React, { createContext, useContext } from 'react';

// Mock auth context for demo
const DemoAuthContext = createContext({
  user: { id: 'demo-user', email: 'demo@example.com' },
  loading: false,
  signOut: () => {},
});

export const useDemoAuth = () => useContext(DemoAuthContext);

export const DemoAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const value = {
    user: { id: 'demo-user', email: 'demo@example.com' },
    loading: false,
    signOut: () => {},
  };

  return (
    <DemoAuthContext.Provider value={value}>
      {children}
    </DemoAuthContext.Provider>
  );
};