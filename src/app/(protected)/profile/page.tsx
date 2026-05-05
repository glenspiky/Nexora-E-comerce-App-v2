export const dynamic = "force-dynamic";
import { auth } from "@/src/lib/auth/auth";
import { headers } from "next/headers"; // 1. Import headers
import { redirect } from "next/navigation";
import AdminProfileView from "./AdminProfileView";
import UserProfileView from "./UserProfileView";

export default async function ProfilePage() {
  // 2. Await the headers and pass them to the getSession call
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <div className="container mx-auto py-10">
      {user.role === "admin" ? (
        <AdminProfileView user={user} />
      ) : (
        <UserProfileView user={user} />
      )}
    </div>
  );
}
