import { User, ShoppingBag, Heart, CreditCard } from "lucide-react";

export default function UserProfileView({ user }: { user: any }) {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <div className="w-24 h-24 rounded-full bg-zinc-100 mx-auto mb-4 flex items-center justify-center">
          <User size={48} className="text-zinc-400" />
        </div>
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-zinc-500">{user.email}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Account Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-50 rounded-lg flex items-center gap-3">
            <ShoppingBag size={20} className="text-zinc-400" />
            <span>My Orders</span>
          </div>
          <div className="p-4 bg-zinc-50 rounded-lg flex items-center gap-3">
            <Heart size={20} className="text-zinc-400" />
            <span>Wishlist</span>
          </div>
          <div className="p-4 bg-zinc-50 rounded-lg flex items-center gap-3">
            <CreditCard size={20} className="text-zinc-400" />
            <span>Billing</span>
          </div>
        </div>
      </div>
    </div>
  );
}
