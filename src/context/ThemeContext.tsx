"use client";

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "dark" | "light";

type Props = {
  toggleTheme(theme?: Theme): void;
  theme: Theme | undefined;
};

type ProviderProps = {
  theme: string;
};

const ThemeContext = createContext({} as Props);

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}

function ThemeProvider({ children, theme }: PropsWithChildren & ProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(theme as Theme);

  const toggleTheme = useCallback(
    (t?: Theme) => {
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setCurrentTheme(t ?? newTheme);
      if (document) document.cookie = `theme=${newTheme}`;
    },
    [setCurrentTheme, currentTheme]
  );

  useEffect(() => {
    document.documentElement.dataset.theme = currentTheme;
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme: currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
