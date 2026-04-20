"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User, HelpCircle, ChevronDown } from "lucide-react";

export default function UserActions() {
  const [isAccOpen, setIsAccOpen] = useState(false);
  const accRef = useRef<HTMLDivElement>(null);

  // Close on outside click
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
          className="flex items-center gap-1 hover:text-[var(--color-primary)] p-2"
        >
          <User size={20} />
          <span className="text-sm font-medium hidden lg:block">Account</span>
          <ChevronDown size={16} />
        </button>

        {isAccOpen && (
          <div className="absolute top-full right-0 w-48 bg-white border shadow-xl rounded-md py-2 z-50 mt-2">
            <Link
              href="/login"
              className="block px-4 py-2 bg-[var(--color-primary)] text-white mx-2 rounded text-center mb-2 font-bold"
            >
              Sign In
            </Link>
            <Link
              href="/profile"
              className="block px-4 py-2 hover:bg-gray-100 text-sm"
            >
              My Account
            </Link>
            <Link
              href="/orders"
              className="block px-4 py-2 hover:bg-gray-100 text-sm"
            >
              Orders
            </Link>
          </div>
        )}
      </div>

      {/* Cart Icon */}
      <Link
        href="/cart"
        className="flex items-center gap-1 hover:text-[var(--color-primary)] p-2 relative"
      >
        <ShoppingCart size={20} />
        <span className="text-sm font-medium hidden lg:block">Cart</span>
        <span className="absolute -top-1 right-0 bg-[var(--color-primary)] text-white text-[10px] rounded-full px-1.5 font-bold">
          0
        </span>
      </Link>
    </div>
  );
}
