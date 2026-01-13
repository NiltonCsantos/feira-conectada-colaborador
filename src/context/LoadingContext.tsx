import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  loadingCount: number;
  setLoadingCount: React.Dispatch<React.SetStateAction<number>>;
}

const LoadingContext = createContext<LoadingContextType>({
  loadingCount: 0,
  setLoadingCount: () => {}, // placeholder
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loadingCount, setLoadingCount] = useState<number>(0);

  return (
    <LoadingContext.Provider value={{ loadingCount, setLoadingCount }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
