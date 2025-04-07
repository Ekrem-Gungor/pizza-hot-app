import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import { UIProvider } from "./contexts/UIContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UIProvider>
      <ThemeProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ThemeProvider>
    </UIProvider>
  </StrictMode>
);
