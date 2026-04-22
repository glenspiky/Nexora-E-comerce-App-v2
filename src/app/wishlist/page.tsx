"use client";
import { useWishlist } from "@/src/context/WishlistContext";
import { useCart } from "@/src/context/CartContext";
import { Trash2, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="max-w-[1200px] mx-auto p-4 min-h-[60vh]">
      <h1 className="text-2xl font-black border-b border-border-subtle pb-4 mb-6">
        Saved Items ({wishlist.length})
      </h1>

      {wishlist.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center gap-4 bg-card border border-border-subtle rounded-xl">
          <div className="w-20 h-20 bg-main-bg rounded-full flex items-center justify-center">
            <ShoppingCart className="text-medium-gray" size={32} />
          </div>
          <p className="text-medium-gray text-lg">
            You haven't saved any items yet.
          </p>
          <Link
            href="/"
            className="bg-primary text-white px-10 py-3 rounded-lg font-bold hover:opacity-90 transition-all shadow-md"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-center border border-border-subtle rounded-lg p-4 bg-card shadow-sm gap-4"
            >
              {/* Product Info */}
              <div className="flex items-center gap-6 w-full sm:w-auto">
                <div className="w-24 h-24 bg-white rounded-lg p-2 flex items-center justify-center border border-border-subtle shrink-0">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="font-bold text-lg leading-tight mb-1">
                    {item.title}
                  </h2>
                  <p className="text-primary font-black">
                    KES {item.price.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Actions Section */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                {/* Remove from Wishlist - Still triggers the 'Removed' toast */}
                <button
                  onClick={() => toggleWishlist(item)}
                  className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
                >
                  <Trash2 size={20} />
                  Remove
                </button>

                {/* Add to Cart Button - NOW ONLY TRIGGERS ONE TOAST */}
                <button
                  onClick={() => addToCart(item)}
                  className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-xs uppercase flex items-center gap-2 hover:opacity-90 transition-all"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
