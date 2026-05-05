export const dynamic = "force-dynamic";
import { auth } from "@/src/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Fetch the session with headers
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. Strict Security Check: If no session or not an admin, kick them out
  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Sidebar would go here */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">{children}</main>
      <Toaster position="bottom-right" />
    </div>
  );
}
