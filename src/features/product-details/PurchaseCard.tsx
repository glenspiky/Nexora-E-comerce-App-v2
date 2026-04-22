"use client";
import { useState } from "react";
import { Plus, Minus, QrCode } from "lucide-react";
import Image from "next/image";

export const PurchaseCard = ({ product }: { product: any }) => {
  const [qty, setQty] = useState(1);

  return (
    <div className="border border-gray-200 p-6 rounded-xl shadow-sm bg-white sticky top-24">
      <div className="flex flex-col items-center mb-6 text-center">
        <div className="relative w-20 h-20 mb-2">
          <Image src={product.meta.qrCode} alt="QR Code" fill />
        </div>
        <p className="text-xs text-gray-400">Scan to share product</p>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium">Quantity</p>
        <div className="flex items-center justify-between border border-gray-800 rounded-full px-4 py-2">
          <button onClick={() => setQty(Math.max(1, qty - 1))}>
            <Minus size={16} />
          </button>
          <span className="font-bold">{qty}</span>
          <button onClick={() => setQty(qty + 1)}>
            <Plus size={16} />
          </button>
        </div>

        <button className="w-full py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-colors uppercase text-sm">
          Add To Cart
        </button>
      </div>
    </div>
  );
};
