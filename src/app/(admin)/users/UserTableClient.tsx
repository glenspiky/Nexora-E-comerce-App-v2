"use client";

import { ShieldCheck, UserMinus, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteUserAction } from "./actions";

export default function UserTableClient({ userId }: { userId: string }) {
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    // confirmation popup
    if (!confirm("Are you sure you want to delete this user?")) return;

    setIsPending(true);
    const t = toast.loading("Removing user...");

    try {
      const res = await deleteUserAction(userId);
      if (res.success) {
        toast.success("User deleted successfully", { id: t });
      } else {
        toast.error("Failed to delete user", { id: t });
      }
    } catch (err) {
      toast.error("A network error occurred", { id: t });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={() =>
          toast.success("Role editing coming soon!", { icon: "🚧" })
        }
        className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-zinc-100 rounded-lg transition-colors"
      >
        <ShieldCheck size={18} />
      </button>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="p-2 text-zinc-400 hover:text-red-600 hover:bg-zinc-100 rounded-lg transition-colors disabled:opacity-50"
      >
        {isPending ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <UserMinus size={18} />
        )}
      </button>
    </div>
  );
}
