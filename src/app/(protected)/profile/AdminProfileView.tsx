import { Shield, Settings, Users, Package } from "lucide-react";
import Link from "next/link";

export default function AdminProfileView({ user }: { user: any }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 border-b pb-6">
        <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
          <Shield size={40} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">{user.name}</h1>
          <span className="px-2 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 uppercase">
            Administrator
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/users"
          className="p-6 bg-white border rounded-xl hover:shadow-md transition-shadow"
        >
          <Users className="mb-2 text-zinc-500" />
          <h3 className="font-bold">Manage Users</h3>
          <p className="text-sm text-zinc-500">
            View and edit user permissions.
          </p>
        </Link>

        <Link
          href="/admin/products"
          className="p-6 bg-white border rounded-xl hover:shadow-md transition-shadow"
        >
          <Package className="mb-2 text-zinc-500" />
          <h3 className="font-bold">Inventory</h3>
          <p className="text-sm text-zinc-500">
            Update stock and product details.
          </p>
        </Link>

        <div className="p-6 bg-white border rounded-xl">
          <Settings className="mb-2 text-zinc-500" />
          <h3 className="font-bold">System Status</h3>
          <p className="text-sm text-zinc-500">All systems operational.</p>
        </div>
      </div>
    </div>
  );
}
