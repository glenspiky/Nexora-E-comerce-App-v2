export const dynamic = "force-dynamic";
import clientPromise from "@/src/lib/auth/db";
import { Users } from "lucide-react";
import UserTableClient from "./UserTableClient";
import { ObjectId } from "mongodb"; // Import this

// Define exactly what the Database object looks like
interface DBUser {
  _id: ObjectId;
  role: string;
  name: string;
  email: string;
}

async function getUsers(): Promise<DBUser[]> {
  const client = await clientPromise;
  const db = client.db("test");
  // Cast the result to our DBUser interface
  const users = (await db
    .collection("user")
    .find({})
    .toArray()) as unknown as DBUser[];
  return users;
}

export default async function AdminUsers() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      {/* ... header code ... */}

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          {/* ... thead code ... */}
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id.toString()} // toString() is vital here
                className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-600 uppercase">
                      {user.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <div className="font-medium text-zinc-900">
                        {user.name}
                      </div>
                      <div className="text-xs text-zinc-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-zinc-100 text-zinc-700">
                    {user.role || "user"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {/* Convert ObjectId to string for the client component */}
                  <UserTableClient userId={user._id.toString()} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
