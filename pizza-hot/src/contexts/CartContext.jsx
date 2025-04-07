import { createContext, useReducer, useState } from "react";
import CartReducer from "../reducers/CartReducer";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(CartReducer, { items: [] });

  // Add a new item to the cart
  function addToCart(item) {
    dispatch({ type: "ADD_TO_CART", item });
  }

  // Remove an item from the cart
  function removeFromCart(id) {
    dispatch({ type: "REMOVE_FROM_CART", id });
  }

  // update the cart
  function updateCart(updatedItem) {
    setCartItems(
      cartItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  }

  // Clear the cart
  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  const cartContext = {
    items: cart.items,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
