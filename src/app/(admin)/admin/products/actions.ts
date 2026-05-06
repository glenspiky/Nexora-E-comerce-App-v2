"use server";


import { revalidatePath } from "next/cache";

export async function deleteProductAction(productId: string) {
  try {
    // Calling DummyJSON's delete endpoint
    const res = await fetch(`https://dummyjson.com/products/${productId}`, {
      method: "DELETE",
    });

    if (!res.ok) return { success: false };

    // revalidatePath won't "hide" the item because the API doesn't actually change
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
