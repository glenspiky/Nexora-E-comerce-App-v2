"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext<any>(null);

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const isLoaded = useRef(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("nexora_wishlist");
    if (saved) setWishlist(JSON.parse(saved));
    isLoaded.current = true;
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded.current) {
      localStorage.setItem("nexora_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const toggleWishlist = (product: any) => {
    const exists = wishlist.find((item) => item.id === product.id);

    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      toast.error("Removed from wishlist");
    } else {
      setWishlist((prev) => [...prev, product]);
      toast.success("Added to wishlist!", {
        icon: "❤️",
        style: { background: "#333", color: "#fff" },
      });
    }
  };

  const isInWishlist = (id: number) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
