"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  User,
  ChevronDown,
  Heart,
  LogOut,
  Package,
} from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { useWishlist } from "@/src/context/WishlistContext";
import { authClient } from "@/src/lib/auth/auth-client"; // 1. Import authClient
import { useRouter } from "next/navigation";

export default function UserActions() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { data: session } = authClient.useSession(); // 2. Get session data
  const [isAccOpen, setIsAccOpen] = useState(false);
  const accRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  // Helper to get initials 
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    setIsAccOpen(false);
    router.push("/");
  };

  return (
    <div className="flex items-center gap-4">
      {/* Account Dropdown */}
      <div className="relative" ref={accRef}>
        <button
          onClick={() => setIsAccOpen(!isAccOpen)}
          className="flex items-center gap-2 hover:text-primary p-2 transition-colors group"
        >
          {/* 3. Conditional Icon: Show Initials if logged in, else User Icon */}
          {session?.user ? (
            <div className="w-8 h-8 rounded-full bg-[#006b5b] text-white flex items-center justify-center text-xs font-bold border-2 border-transparent group-hover:border-[#ff4c00] transition-all">
              {getInitials(session.user.name || "User")}
            </div>
          ) : (
            <User size={20} />
          )}

          <span className="text-sm font-medium hidden lg:block">
            {session?.user
              ? `Hi, ${session.user.name?.split(" ")[0]}`
              : "Account"}
          </span>

          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isAccOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isAccOpen && (
          <div className="absolute top-full right-0 w-64 bg-white dark:bg-[#161616] border border-border-subtle shadow-xl rounded-md py-2 z-[100] mt-2 animate-in fade-in slide-in-from-top-2">
            {/* 4. Conditional Sign In / Sign Out button */}
            {!session ? (
              <Link
                href="/login"
                className="block px-4 py-2 bg-[#006b5b] text-white mx-4 rounded text-center my-2 font-bold text-sm hover:opacity-90"
              >
                Sign In
              </Link>
            ) : (
              <div className="px-4 py-2 mb-2">
                <p className="text-xs text-medium-gray uppercase font-bold tracking-widest">
                  Logged in as
                </p>
                <p className="text-sm font-bold truncate">
                  {session.user.email}
                </p>
              </div>
            )}

            <hr className="border-border-subtle mb-1" />

            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/5 text-sm"
            >
              <User size={18} className="text-medium-gray" />
              My Account
            </Link>

            <Link
              href="/wishlist"
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/5 text-sm"
            >
              <div className="flex items-center gap-3">
                <Heart size={18} className="text-medium-gray" />
                <span>Saved Items</span>
              </div>
              {mounted && wishlist.length > 0 && (
                <span className="bg-[#ff4c00] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              href="/orders"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/5 text-sm"
            >
              <Package size={18} className="text-medium-gray" />
              Orders
            </Link>

            {/* 5. Sign Out Button (Only visible when logged in) */}
            {session && (
              <>
                <hr className="border-border-subtle my-1" />
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 text-sm transition-colors"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </>
            )}
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
          <span className="absolute -top-1 right-0 bg-[#ff4c00] text-white text-[10px] rounded-full px-1.5 font-bold">
            {cart.length}
          </span>
        )}
      </Link>
    </div>
  );
}
