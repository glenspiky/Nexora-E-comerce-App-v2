export const dynamic = "force-dynamic";
import { getAuth } from "@/src/lib/auth/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const GET = async (req: Request) => {
  const auth = await getAuth();
  return toNextJsHandler(auth).GET(req);
};

export const POST = async (req: Request) => {
  const auth = await getAuth();
  return toNextJsHandler(auth).POST(req);
};
