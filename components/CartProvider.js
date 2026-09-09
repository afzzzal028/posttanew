"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("postta-cart");
    if (saved) setCart(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) localStorage.setItem("postta-cart", JSON.stringify(cart));
  }, [cart, isLoaded]);

  function addToCart(product, size, quantity = 1) {
    setCart((prev) => {
      const key = `${product.id}-${size}`;
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          category: product.category,
          size,
          price: product.prices[size],
          quantity,
        },
      ];
    });
  }

  function removeFromCart(key) {
    setCart((prev) => prev.filter((item) => item.key !== key));
  }

  function updateQuantity(key, quantity) {
    if (quantity <= 0) return removeFromCart(key);
    setCart((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity } : item))
    );
  }

  function clearCart() {
    setCart([]);
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isLoaded }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
