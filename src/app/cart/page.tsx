"use client";
import { useCart } from "@/src/context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cart, setCart, subtotal } = useCart();

  const updateQty = (id: number, delta: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.error("Item removed from cart");
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 flex flex-col lg:flex-row gap-6 lg:gap-10">
      {/* Main Cart Section */}
      <div className="flex-[2] border border-border-subtle rounded-xl p-6 bg-card">
        <h1 className="text-2xl font-black border-b border-border-subtle pb-4 mb-6">
          Your Cart ({cart.length})
        </h1>

        {cart.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center gap-4">
            <p className="text-medium-gray text-lg">Your cart is empty.</p>
            <Link
              href="/"
              className="bg-primary text-white px-10 py-3 rounded-lg font-bold hover:opacity-90 transition-all shadow-md"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-center border-b border-border-subtle py-6 gap-4"
              >
                {/* Product Info - Kept exactly as was */}
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

                {/* NEW JUMIA-STYLE BUTTONS */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-8">
                  {/* Remove Button with Bin Icon */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
                  >
                    <Trash2 size={20} />
                    Remove
                  </button>

                  {/* Solid Quantity Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 flex items-center justify-center bg-medium-gray text-white rounded shadow-sm hover:bg-primary-hover disabled:bg-border-subtle disabled:text-medium-gray transition-colors"
                    >
                      <Minus size={16} strokeWidth={3} />
                    </button>

                    <span className="font-black text-base min-w-[20px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-success text-white rounded shadow-sm hover:bg-primary-hover transition-colors"
                    >
                      <Plus size={16} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Sidebar - Kept exactly as was */}
      <aside className="flex-1 h-fit sticky top-24 p-8 bg-card rounded-xl border border-border-subtle shadow-lg">
        <h2 className="font-black mb-6 uppercase tracking-[0.2em] text-[10px] text-medium-gray">
          Cart Summary
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-medium-gray">Items ({cart.length})</span>
            <span className="font-bold">KES {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-medium-gray">Shipping</span>
            <span className="text-success font-bold">Free</span>
          </div>

          <div className="flex justify-between pt-6 border-t border-border-subtle">
            <span className="font-black text-xl">Total</span>
            <span className="font-black text-xl text-text-main">
              KES {subtotal.toLocaleString()}
            </span>
          </div>
        </div>

        <Link href={cart.length > 0 ? "/checkout" : "#"} className="block mt-8">
          <button
            disabled={cart.length === 0}
            className={`w-full py-4 px-6 rounded-lg font-black text-sm tracking-[0.15em] uppercase transition-all shadow-md
              ${
                cart.length > 0
                  ? "bg-success text-white hover:opacity-90"
                  : "bg-border-subtle text-medium-gray cursor-not-allowed"
              }`}
          >
            Proceed to Checkout
          </button>
        </Link>

        <p className="mt-4 text-[10px] text-center text-medium-gray uppercase tracking-tighter">
          Secure checkout powered by Nexora
        </p>
      </aside>
    </div>
  );
}
