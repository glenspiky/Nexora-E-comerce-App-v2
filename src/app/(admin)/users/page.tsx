import clientPromise from "@/src/lib/auth/db";
import { Users } from "lucide-react";
import UserTableClient from "./UserTableClient";

async function getUsers() {
  const client = await clientPromise;
  const db = client.db("test"); // Targets the 'test' database
  const users = await db.collection("user").find({}).toArray(); // Collection is 'user'
  return users;
}

export default async function AdminUsers() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-zinc-900">
          <Users className="w-6 h-6" /> User Management
        </h1>
        <p className="text-sm text-zinc-500">Total Users: {users.length}</p>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="p-4 font-medium text-zinc-600">User</th>
              <th className="p-4 font-medium text-zinc-600">Role</th>
              <th className="p-4 font-medium text-zinc-600 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr
                key={user._id.toString()}
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
