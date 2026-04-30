import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import clientPromise from "./db";

export const auth = betterAuth({
  // We 'await' the promise, then grab the specific database instance
  database: mongodbAdapter(await clientPromise.then((client) => client.db())),
  emailAndPassword: {
    enabled: true,
  },
});
