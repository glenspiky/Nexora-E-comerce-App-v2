"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { Product } from "../types/types";
type RecentContextType = {
  recent: Product[];
  addToRecent: (product: Product) => void;
};

const RecentContext = createContext<RecentContextType | null>(null);

export const RecentProvider = ({ children }: { children: React.ReactNode }) => {
const [recent, setRecent] = useState<Product[]>(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("nexora_recent");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
  }
  return [];
});
 
  useEffect(() => {
    localStorage.setItem("nexora_recent", JSON.stringify(recent));
  }, [recent]);

  const addToRecent = (product: Product) => {
    setRecent((prev) => {
      // Remove the product if it already exists to move it to the front
      const filtered = prev.filter((item) => item.id !== product.id);
      // Keep only the last 10 items
      return [product, ...filtered].slice(0, 10);
    });
  };

  return (
    <RecentContext.Provider value={{ recent, addToRecent }}>
      {children}
    </RecentContext.Provider>
  );
};

export const useRecent = () => {
  const context = useContext(RecentContext);
  if (!context) {
    throw new Error("useRecent must be used within RecentProvider");
  }
  return context;
};
