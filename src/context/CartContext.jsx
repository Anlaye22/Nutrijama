import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQty = (id, amount) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, qty: Math.max(1, p.qty + amount) } : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  const subtotal = cart.reduce((acc, p) => acc + p.price * p.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
