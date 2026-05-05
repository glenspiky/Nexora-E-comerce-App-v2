// import { betterAuth } from "better-auth";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";
// import clientPromise from "./db";
// import { admin } from "better-auth/plugins";

// export async function getAuth() {
//   const client = await clientPromise;
//   const db = client.db();

//   return betterAuth({
//     database: mongodbAdapter(db),
//     emailAndPassword: {
//       enabled: true,
//     },
//     plugins: [admin()],
//   });
// }
export const auth = {};