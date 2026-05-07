"use client";
import { useState } from "react";
import { Plus, Minus, QrCode, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Product } from "@/src/types/types";
import { useCart } from "@/src/context/CartContext";

export const PurchaseCard = ({ product }: { 
  product:Product }) => {
      const { addToCart } = useCart();
    
  const [quantity, setquantity] = useState<number>(1);

//add to cart
   const handleAddToCart = (e: React.MouseEvent) => {
     e.preventDefault();
     addToCart({...product});
   };
   console.log(product);
   
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
          <button onClick={() => setquantity(Math.max(1, quantity - 1))}>
            <Minus size={16} />
          </button>
          <span className="font-bold">{quantity}</span>
          <button onClick={() => setquantity(quantity + 1)}>
            <Plus size={16} />
          </button>
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
  );
};
