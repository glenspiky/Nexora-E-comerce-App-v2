"use client";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { useWishlist } from "@/src/context/WishlistContext"; // 1. Import Wishlist hook

export const ProductCard = ({ item }: { item: any }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist(); // 2. Access wishlist methods

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const isFavorite = isInWishlist(item.id); // 3. Check if active

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(item);
  };

  // Handle Wishlist click
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page
    toggleWishlist(item);
  };

  return (
    <div className="group relative bg-[#fafafa] flex flex-col shadow-[0_2px_5px_-1px_rgba(50,50,93,0.25),0_1px_3px_-1px_rgba(0,0,0,0.3)] rounded-t-[10px] border border-gray-200 h-full overflow-hidden transition-all duration-300">
      {/* Wishlist Overlay - Updated Logic */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
      >
        <Heart
          size={18}
          className={`transition-colors duration-300 ${
            isFavorite
              ? "fill-red-500 text-red-500"
              : "text-gray-400 hover:text-red-500"
          }`}
        />
      </button>

      {/* Image Container */}
      <Link
        href={`/product/${item.id}`}
        className="relative aspect-square overflow-hidden bg-white"
      >
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Description */}
      <div className="p-2 flex flex-col gap-2 flex-1">
        <h3 className="text-sm font-medium line-clamp-2 min-h-[40px]">
          {item.title}
        </h3>

        {/* Rating Section */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {stars.map((star) => (
              <Star
                key={star}
                size={14}
                className={`${
                  star <= Math.round(item.rating)
                    ? "text-[#ffd700] fill-[#ffd700]"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            {item.rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-auto pt-2 flex flex-col gap-2">
          <div className="flex items-baseline gap-2">
            <h2 className="text-lg font-bold text-success uppercase">
              KES {item.price.toLocaleString()}
            </h2>
            <span className="text-[10px] text-red-500 line-through opacity-70">
              KES {(item.price * 1.2).toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-2 bg-primary hover:bg-white border border-transparent hover:border-primary text-white hover:text-primary rounded-md flex justify-center items-center gap-2 text-xs font-bold transition-all duration-300 uppercase"
          >
            <ShoppingCart size={16} />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};
