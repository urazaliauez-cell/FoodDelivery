import React, { createContext, useContext, useState, ReactNode } from "react";
import { Food } from "../data/foods";

export interface CartItem {
  food: Food;
  quantity: number;
}

interface CartType {
  items: CartItem[];
  total: number;
  count: number;
  addToCart: (food: Food, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(food: Food, quantity = 1) {
    setItems(previous => {
      const existing = previous.find(item => item.food.id === food.id);

      if (existing) {
        return previous.map(item =>
          item.food.id === food.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...previous, { food, quantity }];
    });
  }

  function removeFromCart(id: string) {
    setItems(previous => previous.filter(item => item.food.id !== id));
  }

  function increase(id: string) {
    setItems(previous =>
      previous.map(item =>
        item.food.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decrease(id: string) {
    setItems(previous =>
      previous
        .map(item =>
          item.food.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce(
    (sum, item) => sum + item.food.price * item.quantity, 0
  );

  const count = items.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  return (
    <CartContext.Provider value={{
      items, total, count, addToCart,
      removeFromCart, increase, decrease, clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartProvider is missing");
  return context;
}
