"use client";

import { UserMinus, Loader2, ShieldCheck } from "lucide-react";
import { deleteProduct } from "./users/actions";
import toast from "react-hot-toast";
import { useState } from "react";

export function ProductActions({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Delete this item from inventory?")) return;

    setLoading(true);
    const t = toast.loading("Removing product...");

    try {
      const res = await deleteProduct(productId);
      if (res.success) {
        toast.success("Product deleted", { id: t });
      } else {
        toast.error("Failed to delete", { id: t });
      }
    } catch (err) {
      toast.error("Connection error", { id: t });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 justify-end">
      <button
        onClick={() => toast.success("Editing enabled")}
        className="text-zinc-400 hover:text-blue-500"
      >
        <ShieldCheck size={18} />
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-zinc-400 hover:text-red-500 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <UserMinus size={18} />
        )}
      </button>
    </div>
  );
}
