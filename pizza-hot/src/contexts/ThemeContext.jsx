import { createContext, useReducer } from "react";
import { themeReducer } from "../reducers/ThemeReducer";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: "primary",
    mode: "dark",
  });

  function changeTheme(color) {
    dispatch({ type: "CHANGE_THEME", payload: color });
  }

  function changeMode(value) {
    dispatch({ type: "CHANGE_MODE", payload: value });
  }

  return (
    <ThemeContext.Provider value={{ ...state, changeTheme, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
