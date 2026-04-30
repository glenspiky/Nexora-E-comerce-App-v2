"use client"
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import {
  Megaphone,
  Cake,
  Droplets,
  Leaf,
  FlaskConical,
  GlassWater,
  Book,
  Brush,
} from "lucide-react";

const SIDEBAR_ITEMS = [
  // Slug mappings for DummyJSON categories
  { name: "Promos", icon: Megaphone, slug: "groceries" },
  { name: "Snacks", icon: Cake, slug: "skincare" },
  { name: "Fats & Oils", icon: Droplets, slug: "beauty" },
  { name: "Vegetables", icon: Leaf, slug: "groceries" },
  { name: "Food Additives", icon: FlaskConical, slug: "fragrances" },
  { name: "Beverage", icon: GlassWater, slug: "fragrances" },
  { name: "Stationery", icon: Book, slug: "furniture" },
  { name: "Cosmetics", icon: Brush, slug: "beauty" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)]">
      <div className="hidden min-[815px]:flex bg-success text-white py-2 justify-center rounded-t-[5px]">
        <h3 className="font-bold">Top Sales</h3>
      </div>

      <ul className="hidden min-[815px]:flex flex-col bg-white p-2 gap-2.5">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === `/category/${item.slug}`;

          return (
            <li key={item.name}>
              <Link
                href={`/category/${item.slug}`}
                className={`flex items-center gap-4 py-1.5 px-2 rounded-sm cursor-pointer transition-colors
                  ${isActive ? "bg-gray-100 text-success" : "hover:bg-gray-50 text-gray-700"}
                `}
              >
                <item.icon
                  size={20}
                  className={isActive ? "text-success" : "text-success/70"}
                />
                <span
                  className={`text-sm whitespace-nowrap ${isActive ? "font-bold" : ""}`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
