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
    },
    [setCurrentTheme, currentTheme]
  );

  useEffect(() => {
    document.documentElement.dataset.theme = currentTheme;
    if (document) {
      var now = new Date();
      var time = now.getTime();
      var expireTime = time + 1000 * 86400 * 100;
      now.setTime(expireTime);
      document.cookie = `theme=${currentTheme};expires=${now.toUTCString()}`;
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme: currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
