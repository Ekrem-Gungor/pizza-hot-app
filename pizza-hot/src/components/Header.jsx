import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { CartContext } from "../contexts/CartContext";
import { UIContext } from "../contexts/UIContext";

export default function Header() {
  const { theme } = useContext(ThemeContext);
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UIContext);

  const totalCartItems = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  return (
    <header>
      <nav
        className={`navbar navbar-expand bg-${theme} border-bottom border-body`}
        data-bs-theme="dark"
      >
        <div className="container">
          <a href="#" className="navbar-brand">
            🍕 Pizza Hot
          </a>
          <button onClick={() => showCart()} className="btn btn-dark">
            <i className="bi bi-cart3"></i>
            <span className="ms-2">({totalCartItems})</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
