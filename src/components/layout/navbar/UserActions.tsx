"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User, ChevronDown, Heart } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { useWishlist } from "@/src/context/WishlistContext";

export default function UserActions() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [isAccOpen, setIsAccOpen] = useState(false);
  const accRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accRef.current && !accRef.current.contains(e.target as Node)) {
        setIsAccOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex items-center gap-4">
      {/* Account Dropdown */}
      <div className="relative" ref={accRef}>
        <button
          onClick={() => setIsAccOpen(!isAccOpen)}
          className="flex items-center gap-1 hover:text-primary p-2 transition-colors"
        >
          <User size={20} />
          <span className="text-sm font-medium hidden lg:block">Account</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isAccOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu - Fixed opening logic */}
        {isAccOpen && (
          <div className="absolute top-full right-0 w-56 bg-white dark:bg-[#161616] border border-border-subtle shadow-xl rounded-md py-2 z-[100] mt-2 animate-in fade-in slide-in-from-top-2">
            <Link
              href="/login"
              className="block px-4 py-2 bg-primary text-white mx-2 rounded text-center mb-3 font-bold text-sm hover:opacity-90"
            >
              Sign In
            </Link>

            <hr className="border-border-subtle mb-2" />

            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/5 text-sm"
            >
              <User size={18} className="text-medium-gray" />
              My Account
            </Link>

            {/* HEART ICON INSIDE MENU */}
            <Link
              href="/wishlist"
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/5 text-sm"
            >
              <div className="flex items-center gap-3">
                <Heart size={18} className="text-medium-gray" />
                <span>Saved Items</span>
              </div>
              {mounted && wishlist.length > 0 && (
                <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              href="/orders"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/5 text-sm"
            >
              <ShoppingCart size={18} className="text-medium-gray" />
              Orders
            </Link>
          </div>
        )}
      </div>

      {/* Cart Icon */}
      <Link
        href="/cart"
        className="flex items-center gap-1 hover:text-primary p-2 relative"
      >
        <ShoppingCart size={20} />
        <span className="text-sm font-medium hidden lg:block">Cart</span>

        {mounted && cart.length > 0 && (
          <span className="absolute -top-1 right-0 bg-primary text-white text-[10px] rounded-full px-1.5 font-bold">
            {cart.length}
          </span>
        )}
      </Link>
    </div>
  );
}
