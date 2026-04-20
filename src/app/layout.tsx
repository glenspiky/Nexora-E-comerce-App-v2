import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 1. The Import
import "./globals.css";

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
        <div className="flex flex-col min-h-screen bg-white">{children}</div>
      </body>
    </html>
  );
}
