import { createContext, useState } from "react";

export const ThemeContex = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  return (
    <ThemeContex.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContex.Provider>
  );
};
