"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // 1. Import Link
import { usePathname } from "next/navigation"; // 2. Import usePathname
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
  CheckCircle,
} from "lucide-react";

const CATEGORIES = [
  { name: "Outfits", icon: Shirt, slug: "mens-clothing" },
  { name: "Smartphones", icon: Smartphone, slug: "smartphones" },
  { name: "Groceries", icon: Apple, slug: "groceries" },
  { name: "Laptops", icon: Laptop, slug: "laptops" },
  { name: "Watches", icon: Watch, slug: "mens-watches" },
  { name: "Footwear", icon: Footprints, slug: "mens-shoes" },
  { name: "Glasses", icon: Glasses, slug: "sunglasses" },
];

export const Category = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // Close sidebar when clicking a link on mobile
  const handleLinkClick = () => setIsOpen(false);

  return (
    <div className="w-full bg-light-gray border-b border-medium-gray/20 relative z-30 ">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10">
        <div className="flex items-center justify-between relative h-12 lg:h-14 bg-white md:bg-transparent border md:border-none rounded-md md:rounded-none">
          <div
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 bg-primary text-white px-2 h-full cursor-pointer hover:bg-primary-hover transition-colors "
          >
            <SlidersHorizontal size={24} className="rotate-90" />
            <p className="font-bold text-sm lg:text-base">Category</p>
          </div>

          {isOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-[99] md:hidden"
              onClick={() => setIsOpen(false)}
            />
          )}

          <ul
            className={`
            fixed top-0 left-0 h-full w-[60%] bg-success z-[100] flex flex-col pt-16 gap-6 transition-transform duration-300
            min-[1135px]:static min-[1135px]:flex min-[1135px]:flex-row min-[1135px]:h-auto min-[1135px]:w-auto min-[1135px]:bg-transparent min-[1135px]:pt-0 min-[1135px]:gap-8 
            ${isOpen ? "translate-x-0" : "-translate-x-full min-[1135px]:translate-x-0"}
          `}
          >
            <button
              className="absolute top-4 right-4 text-white min-[1135px]:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X size={28} />
            </button>

            {CATEGORIES.map((cat) => {
              // 4. Check if active
              const isActive = pathname === `/category/${cat.slug}`;

              return (
                <li key={cat.name} className="flex items-center">
                  <Link
                    href={`/category/${cat.slug}`}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-2 px-6 min-[1135px]:px-0 group cursor-pointer transition-all
                      ${isActive ? "opacity-100 scale-105" : "opacity-80 hover:opacity-100"}
                    `}
                  >
                    <cat.icon
                      size={20}
                      className={`transition-transform group-hover:scale-110 
                        ${isActive ? "text-primary" : "text-white min-[1135px]:text-primary"}
                      `}
                    />
                    <p
                      className={`font-semibold text-sm transition-colors group-hover:text-primary
                      ${isActive ? "text-primary underline decoration-2 underline-offset-4" : "text-white min-[1135px]:text-success"}
                    `}
                    >
                      {cat.name}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>

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
