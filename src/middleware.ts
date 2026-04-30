import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/src/lib/auth/auth"; // Ensure this matches your path

export default async function middleware(request: NextRequest) {
  // 1. Check for an active session
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl;

  // 2. Define your Logic
  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/profile");

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/sign-up");

  // 3. Redirects
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Skip static files and images to save CPU cycles on your i3
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
