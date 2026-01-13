import React, { createContext, ReactNode, useContext, useState } from "react";
import Snackbar from "../components/shared/Snackbar";
import { string } from "yup";

interface ErrorContextType {
  error: string | null;
  bgColor:string | null
  throwError: (message: string, color?:string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [bgColor, setBgColor] = useState<string | null>(null);

  const throwError = (message: string, color?:string) => {
    setError(message);
    setBgColor(color || null);
    setVisible(true);
  };

  const handleHideSnackbar = () => {
    setVisible(false);
    setError(null);
  };

  return (
    <>
      <ErrorContext.Provider value={{ error :null, bgColor,throwError }}>
        {children}
      </ErrorContext.Provider>
      <Snackbar
        message={error || ""}
        visible={visible}
        onHide={handleHideSnackbar}
        bgColor={bgColor}
      />
    </>
  );
};

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("error context empty");
  }
  return context;
};
