"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  MessageSquare,
  Truck,
  RefreshCcw,
  CreditCard,
} from "lucide-react";

export default function HelpMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);

  // Manual "Click Outside" logic to match your UserActions
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (helpRef.current && !helpRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={helpRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 hover:text-[var(--color-primary)] p-2 transition-colors"
      >
        <HelpCircle size={24} />
        <span className="text-sm font-bold hidden lg:block">Help</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Manual Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 w-60 bg-white border border-gray-200 shadow-xl rounded-md py-3 z-[60] mt-2 animate-in fade-in zoom-in duration-150">
          <Link
            href="/help"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm font-medium transition-colors"
          >
            <HelpCircle size={18} className="text-[var(--color-primary)]" />
            Help Center
          </Link>

          <Link
            href="/track-order"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm font-medium transition-colors"
          >
            <Truck size={18} className="text-[var(--color-primary)]" />
            Track Order
          </Link>

          <Link
            href="/returns"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm font-medium transition-colors"
          >
            <RefreshCcw size={18} className="text-[var(--color-primary)]" />
            Returns & Refunds
          </Link>

          <Link
            href="/payments"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm font-medium transition-colors border-b border-gray-100"
          >
            <CreditCard size={18} className="text-[var(--color-primary)]" />
            Payment Methods
          </Link>

          {/* Action Button */}
          <div className="px-3 mt-3">
            <button className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white py-2.5 rounded shadow-sm text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
              <MessageSquare size={16} />
              Live Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
