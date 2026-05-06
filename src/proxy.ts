import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "@/src/lib/auth/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/checkout") || pathname.startsWith("/profile")) {
    const auth = await getAuth();

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      // Logic for redirecting if not logged in
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackURL", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Ensure your config matcher is still there
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
