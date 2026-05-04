"use client";

import React from "react";
import { authClient } from "@/src/lib/auth/auth-client";
import { useCart } from "@/src/context/CartContext";
import { useWishlist } from "@/src/context/WishlistContext";
import {
  Package,
  Heart,
  Settings,
  MapPin,
  Clock,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = authClient.useSession();
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  // Mock data for your Order Tracking - you can replace this with a DB call later
  const recentOrders = [
    { id: "NX-8821", date: "Apr 28, 2026", status: "In Transit", total: 12500 },
    { id: "NX-7740", date: "Apr 15, 2026", status: "Delivered", total: 4200 },
  ];

  return (
    <div className="max-w-[1200px] mx-auto p-4 py-10 space-y-8">
      {/* 1. WELCOME HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-[#006b5b]">
            Hello, {session?.user?.name?.split(" ")[0] || "User"}!
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your orders and account preferences here.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-bold transition-colors"
          >
            <Settings size={16} /> Edit Profile
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. MAIN TRACKING SECTION (LEFT) */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h2 className="font-black uppercase tracking-widest text-xs text-gray-400 flex items-center gap-2">
                <Package size={16} className="text-[#006b5b]" /> Recent Orders
              </h2>
              <Link
                href="/orders"
                className="text-[#006b5b] text-xs font-bold hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="divide-y divide-gray-50">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 flex flex-wrap items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="font-bold text-sm">Order {order.id}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={12} /> {order.date}
                      </p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-orange-100 text-[#ff4c00] text-[10px] font-black uppercase tracking-tighter">
                      {order.status}
                    </div>
                    <p className="font-black text-sm text-[#006b5b]">
                      KES {order.total.toLocaleString()}
                    </p>
                    <button className="text-gray-400 hover:text-black">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center space-y-3">
                  <ShoppingBag size={48} className="mx-auto text-gray-200" />
                  <p className="text-gray-500 text-sm">No orders yet.</p>
                  <Link
                    href="/"
                    className="inline-block bg-[#006b5b] text-white px-6 py-2 rounded-lg font-bold text-xs"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* QUICK ADDRESS SNIPPET */}
          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#006b5b]">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Primary Address
                </p>
                <p className="text-sm font-medium">Nairobi, Kenya</p>
              </div>
            </div>
            <button className="text-xs font-bold text-[#006b5b] hover:underline">
              Change
            </button>
          </section>
        </div>

        {/* 3. STATS & WISHLIST (RIGHT) */}
        <div className="space-y-6">
          {/* STAT CARDS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#006b5b] p-6 rounded-2xl text-white">
              <p className="text-[10px] font-bold uppercase opacity-80 tracking-widest">
                Saved Items
              </p>
              <p className="text-3xl font-black mt-1">{wishlist.length}</p>
            </div>
            <div className="bg-[#ff4c00] p-6 rounded-2xl text-white">
              <p className="text-[10px] font-bold uppercase opacity-80 tracking-widest">
                Cart Items
              </p>
              <p className="text-3xl font-black mt-1">{cart.length}</p>
            </div>
          </div>

          {/* WISHLIST PREVIEW */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50">
              <h2 className="font-black uppercase tracking-widest text-xs text-gray-400 flex items-center gap-2">
                <Heart size={16} className="text-[#ff4c00]" /> Wishlist Preview
              </h2>
            </div>
            <div className="p-4 space-y-4">
              {wishlist.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-gray-50 rounded p-1 shrink-0">
                    <img
                      src={item.thumbnail[0]}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate group-hover:text-[#006b5b] transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-[#006b5b] font-black">
                      KES {item.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
              {wishlist.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-4">
                  Your wishlist is empty.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
