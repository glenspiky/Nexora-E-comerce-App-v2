"use client";

import { useEffect, useState } from "react";
import {
  SlidersHorizontal,
  Shirt,
  Smartphone,
  Apple,
  Laptop,
  Watch,
  Footprints,
  Glasses,
  X,
} from "lucide-react"; // Matching your modern icon set

const CATEGORIES = [
  { name: "Outfits", icon: Shirt },
  { name: "Smartphones", icon: Smartphone },
  { name: "Groceries", icon: Apple },
  { name: "Laptops", icon: Laptop },
  { name: "Watches", icon: Watch },
  { name: "Footwear", icon: Footprints },
  { name: "Glasses", icon: Glasses },
];

export const Category = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div className="w-full bg-light-gray border-b border-medium-gray/20">
      <div className="max-w-360 mx-auto px-4 lg:px-10">
        <div className="flex items-center justify-between relative h-12 lg:h-14 bg-white md:bg-transparent border md:border-none rounded-md md:rounded-none overflow-hidden">
          {/* LEFT: Category Toggle */}
          <div
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 bg-primary text-white px-2 h-full cursor-pointer hover:bg-primary-hover transition-colors"
          >
            <SlidersHorizontal size={24} className="rotate-90" />
            <p className="font-bold text-sm lg:text-base">Category</p>
          </div>

          {/* OVERLAY */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-[100] md:hidden"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* CENTER: Navigation Links / Mobile Sidebar */}
          <ul
            className={`
    /* Mobile Sidebar Defaults */
    fixed top-0 left-0 h-full w-[60%] bg-success z-[101] flex flex-col pt-16 gap-6 transition-transform duration-300
    
    /* Desktop Horizontal Bar - Triggered at 1135px */
    min-[1135px]:static min-[1135px]:flex min-[1135px]:flex-row min-[1135px]:h-auto min-[1135px]:w-auto 
    min-[1135px]:bg-transparent min-[1135px]:pt-0 min-[1135px]:gap-8
    
    /* Logic: Slide out on mobile, always visible on desktop */
    ${isOpen ? "translate-x-0" : "-translate-x-full min-[1135px]:translate-x-0"}
  `}
          >
            {/* Close Button - Only visible on mobile (hidden at 1135px) */}
            <button
              className="absolute top-4 right-4 text-white min-[1135px]:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X size={28} />
            </button>

            {CATEGORIES.map((cat) => (
              <li
                key={cat.name}
                /* padding: px-6 on mobile sidebar, px-0 on desktop bar */
                className="flex items-center gap-2 px-6 min-[1135px]:px-0 group cursor-pointer"
              >
                <cat.icon
                  size={20}
                  /* Icon color: white on mobile, primary orange on desktop */
                  className="text-white min-[1135px]:text-primary group-hover:scale-110 transition-transform"
                />
                <p
                  /* Text color: white on mobile, success green on desktop */
                  className="text-white min-[1135px]:text-success font-semibold text-sm group-hover:text-primary transition-colors"
                >
                  {cat.name}
                </p>
              </li>
            ))}
          </ul>

          {/* RIGHT: Wallet Balance */}
          <div className="flex flex-col items-center bg-success text-white px-4 py-1 h-13 justify-center min-w-20 cursor-pointer hover:opacity-90 rounded-md mr-1">
            <p className="text-[10px] uppercase font-bold tracking-tighter opacity-80">
              Wallet Bal
            </p>
            <span className="text-xs lg:text-sm font-bold">KES 0.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
