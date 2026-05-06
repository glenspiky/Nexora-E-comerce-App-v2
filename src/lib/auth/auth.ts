import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import clientPromise from "./db";
import { admin } from "better-auth/plugins";

export async function getAuth() {
  const client = await clientPromise;
  const db = client.db();

  return betterAuth({
    database: mongodbAdapter(db),
    //  This allows the server to recognize the Vercel domain
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
      enabled: true,
    },
    advanced: {
      // Allows the __Secure- cookie to be read over HTTPS
      useSecureCookies: true,
    },
    plugins: [admin()],
  });
}
