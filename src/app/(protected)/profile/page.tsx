export const dynamic = "force-dynamic";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminProfileView from "./AdminProfileView";
import UserProfileView from "./UserProfileView";
import { getAuth } from "@/src/lib/auth/auth";

const auth = await getAuth();
export default async function ProfilePage() {
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
