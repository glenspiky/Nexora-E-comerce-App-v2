import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect only the checkout and profile areas
  const isProtectedPath =
    pathname.startsWith("/checkout") || pathname.startsWith("/profile");

  if (isProtectedPath) {
    // Check for the Better Auth session cookie directly
    const sessionCookie = request.cookies.get("better-auth.session_token");

    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackURL", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Exclude static files and internal Next.js paths
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
