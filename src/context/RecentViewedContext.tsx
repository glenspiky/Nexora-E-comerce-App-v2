"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

const RecentContext = createContext<any>(null);

export const RecentProvider = ({ children }: { children: React.ReactNode }) => {
  const [recent, setRecent] = useState<any[]>([]);
  const isLoaded = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("nexora_recent");
    if (saved) setRecent(JSON.parse(saved));
    isLoaded.current = true;
  }, []);

  useEffect(() => {
    if (isLoaded.current) {
      localStorage.setItem("nexora_recent", JSON.stringify(recent));
    }
  }, [recent]);

  const addToRecent = (product: any) => {
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

export const useRecent = () => useContext(RecentContext);
