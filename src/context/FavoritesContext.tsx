import React, { createContext, useContext, useState, ReactNode } from "react";
import { Food } from "../data/foods";

interface FavoritesType {
  favorites: Food[];
  toggleFavorite: (food: Food) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Food[]>([]);

  function toggleFavorite(food: Food) {
    setFavorites(previous =>
      previous.some(item => item.id === food.id)
        ? previous.filter(item => item.id !== food.id)
        : [...previous, food]
    );
  }

  function isFavorite(id: string) {
    return favorites.some(item => item.id === id);
  }

  function clearFavorites() {
    setFavorites([]);
  }

  return (
    <FavoritesContext.Provider value={{
      favorites, toggleFavorite, isFavorite, clearFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("FavoritesProvider is missing");
  return context;
}
