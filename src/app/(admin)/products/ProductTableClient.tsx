"use client";

import { ShieldCheck, UserMinus, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteProductAction } from "./actions";

export default function ProductTableClient({
  productId,
}: {
  productId: string;
}) {
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    if (!confirm("Remove this product from inventory?")) return;

    setIsPending(true);
    const t = toast.loading("Removing item...");

    try {
      const res = await deleteProductAction(productId);
      if (res.success) {
        toast.success("Product removed", { id: t });
      } else {
        toast.error("Failed to delete", { id: t });
      }
    } catch (err) {
      toast.error("Network error", { id: t });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={() => toast.success("Edit mode coming soon!")}
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
