"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import toast, { Toaster } from "react-hot-toast"; // Make sure toast is imported here

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);
  const isLoaded = useRef(false);

  // Load from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("myShopCart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    isLoaded.current = true;
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded.current) {
      localStorage.setItem("myShopCart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: any, quantity = 1) => {
    const actualQty = Math.max(1, quantity);

    // --- ADDED THIS: Trigger the toast here ---
    toast.success(`Added ${product.title} to cart!`, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + actualQty }
            : item,
        );
      }
      return [...prev, { ...product, quantity: actualQty }];
    });
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart, subtotal }}>
      {children}
      {/* Just ONE toaster, set to top-center */}
      <Toaster position="top-center" reverseOrder={false} />
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
