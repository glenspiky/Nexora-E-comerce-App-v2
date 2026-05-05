"use server";

import clientPromise from "@/src/lib/auth/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(userId: string) {
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const result = await db.collection("user").deleteOne({
      _id: new ObjectId(userId),
    });

    if (result.deletedCount === 0) {
      return { success: false, message: "User not found" };
    }

    // This refreshes the cache for the users page
    revalidatePath("/users");
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, message: "Server error" };
  }
}
