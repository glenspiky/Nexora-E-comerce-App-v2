// app/(admin)/layout.tsx
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Global Sidebar/Navbar would go here */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">{children}</main>
      {/* Ensures popups work across all admin pages */}
      <Toaster position="bottom-right" />
    </div>
  );
}
