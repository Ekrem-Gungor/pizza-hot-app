const themeColors = [
  "warning",
  "danger",
  "success",
  "info",
  "primary",
  "secondary",
  "dark",
];

import { useContext } from "react";
import "./ThemeSelector.css";
import { ThemeContext } from "../contexts/ThemeContext";

export default function ThemeSelector() {
  const { changeTheme, mode, changeMode } = useContext(ThemeContext);

  function toggleMode() {
    const newMode = mode === "dark" ? "light" : "dark";
    changeMode(newMode);
  }

  return (
    <div className="container theme-selector">
      <div className="mode-toggle">
        <i
          className={`bi bi-moon-stars${mode === "dark" ? "-fill" : ""}`}
          onClick={toggleMode}
        ></i>
      </div>
      <div className="theme-links">
        <p>Select Theme</p>
        {themeColors.map((color) => (
          <span
            onClick={() => changeTheme(color)}
            key={color}
            className={`bg-${color}`}
          ></span>
        ))}
      </div>
    </div>
  );
}
