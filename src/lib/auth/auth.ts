import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import clientPromise from "./db";
import { admin } from "better-auth/plugins";

export async function getAuth() {
  const client = await clientPromise;
  const db = client.db();

  return betterAuth({
    database: mongodbAdapter(db),
    // ADD THIS: It tells the server its home address
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
      enabled: true,
    },
    // ADD THIS: Ensures the server trusts the Vercel proxy headers
    advanced: {
      useSecureCookies: true,
    },
    plugins: [admin()],
  });
}
