"use client";

import { BsMoon, BsSun } from "react-icons/bs";

import { useTheme } from "@/src/context/ThemeContext";

function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={() => toggleTheme()} className="c-toggle-theme-btn">
      {theme === "dark" ? (
        <>
          <BsSun className="c-toggle-theme-btn__icon" />
          <span className="c-toggle-theme-btn__label">Light theme</span>
        </>
      ) : (
        <>
          <BsMoon className="c-toggle-theme-btn__icon" />
          <span className="c-toggle-theme-btn__label">Dark theme</span>
        </>
      )}
    </button>
  );
}

export default ToggleThemeButton;
