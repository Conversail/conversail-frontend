"use client";

import { useTheme } from "next-themes";
import { BsMoon, BsSun } from "react-icons/bs";

function ToggleThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="c-toggle-theme-btn"
    >
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
