// LoadingContext.js
import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const simulateLoading = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  return (
    <LoadingContext.Provider value={{ loading, simulateLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
