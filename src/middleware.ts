import { NextResponse, type NextRequest } from "next/server";

/**
 * Guards the admin dashboard: without an admin cookie, or with one whose token
 * has expired, /admin/* goes to the login. The token's `exp` is decoded, not
 * verified — the API verifies every request, and a 401 there also ends at
 * the login. Public pages never run this (see the matcher).
 */
const COOKIE = "admin_token";

function tokenExpiry(token: string): number {
  try {
    const part = token.split(".")[1] ?? "";
    const base64 = part.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="))) as {
      exp?: unknown;
    };
    return typeof payload.exp === "number" ? payload.exp : 0;
  } catch {
    return 0;
  }
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const token = request.cookies.get(COOKIE)?.value;
  if (token && tokenExpiry(token) * 1000 > Date.now()) return NextResponse.next();

  const login = new URL("/admin/login", request.url);
  login.searchParams.set("next", pathname + search);
  if (token) login.searchParams.set("expired", "1");
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
