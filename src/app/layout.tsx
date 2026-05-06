import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/navbar/Navbar";
import Footer from "../components/layout/footer/Footer"; // 1. Import Footer
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { RecentProvider } from "../context/RecentViewedContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[var(--bg-main)]`}>
        <CartProvider>
          <WishlistProvider>
            <RecentProvider>
              <div className="flex flex-col min-h-screen w-full bg-white">
                <Navbar />

                <main className="flex-1">{children}</main>

                <Footer />
              </div>
            </RecentProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
