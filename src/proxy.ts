import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "@/src/lib/auth/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/checkout") || pathname.startsWith("/profile")) {
    const auth = await getAuth();
    // This checks the actual database, not just the cookie name
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}