import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 1. The Import
import "./globals.css";
import Navbar from "../components/layout/navbar/Navbar";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";

// 2. The Definition (This is what is missing!)
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 3. The Usage */}
      <body className={`${inter.className} bg-[var(--bg-main)]`}>
        <CartProvider>
          <WishlistProvider>
            <div className="flex flex-col min-h-screen bg-white">
              <Navbar></Navbar>
              {children}
            </div>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
