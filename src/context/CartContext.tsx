"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import toast, { Toaster } from "react-hot-toast"; // Make sure toast is imported here

type Product = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
};
type CartItem = Product & {
  quantity: number;
};
const CartContext = createContext<{
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  subtotal: number;
} | null>(null);
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("myShopCart");
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("myShopCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
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

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
