"use client";

import React, { useState } from "react";
import { useCart } from "@/src/context/CartContext";
import { authClient } from "@/src/lib/auth/auth-client";
import { ShieldCheck, Truck, CreditCard, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, subtotal } = useCart();
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    address: "",
    city: "Nairobi",
    phone: "",
  });

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically integrate with M-Pesa or Stripe
    alert("Order Received! Processing your Nexora delivery.");
    router.push("/dashboard");
  };

  // If cart is empty, redirect back to cart
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link
          href="/cart"
          className="text-[#006b5b] font-bold flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Back to Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto p-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Shipping & Payment */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-[#006b5b]">
              <Truck size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight">
                Shipping Details
              </h2>
            </div>

            <form
              id="checkout-form"
              onSubmit={handlePlaceOrder}
              className="grid grid-cols-1 gap-4"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500">
                  Contact Email
                </label>
                <input
                  type="email"
                  disabled
                  value={session?.user?.email || ""}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500">
                  Delivery Address
                </label>
                <input
                  required
                  type="text"
                  placeholder="Street name, apartment, or house number"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff4c00] outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">
                    City
                  </label>
                  <input
                    type="text"
                    value="Nairobi"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                    readOnly
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="07..."
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff4c00] outline-none"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-[#006b5b]">
              <CreditCard size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight">
                Payment Method
              </h2>
            </div>
            <div className="p-4 border-2 border-[#006b5b] bg-green-50/30 rounded-lg flex items-center justify-between">
              <span className="font-bold">Pay on Delivery</span>
              <div className="w-5 h-5 rounded-full bg-[#006b5b] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-400">
              More payment options (M-Pesa, Card) coming soon.
            </p>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg sticky top-24">
            <h2 className="font-black mb-6 uppercase tracking-widest text-xs text-gray-400">
              Order Summary
            </h2>

            <div className="max-h-[300px] overflow-y-auto mb-6 pr-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-50 rounded p-1 flex-shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{item.title}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-sm">
                    KES {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold">
                  KES {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery Fee</span>
                <span className="text-[#006b5b] font-bold text-xs uppercase">
                  Free
                </span>
              </div>
              <div className="flex justify-between border-t pt-4">
                <span className="font-black text-lg uppercase">Total</span>
                <span className="font-black text-xl text-[#006b5b]">
                  KES {subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              form="checkout-form"
              type="submit"
              className="w-full mt-8 py-4 bg-[#ff4c00] text-white font-black uppercase tracking-widest rounded-lg hover:opacity-90 transition-all shadow-md active:scale-95"
            >
              Complete Order
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase">
              <ShieldCheck size={14} />
              Secure Encrypted Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
