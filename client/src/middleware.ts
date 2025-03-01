import { NextRequest, NextResponse } from "next/server";
import {
  NEXT_PUBLIC_DB_API_BASEURL,
  NEXT_PUBLIC_AUTH_API_BASEURL,
} from "@/config";

export async function middleware(req: NextRequest) {
  // return NextResponse.next();
  // * Get cookie
  const token = req.cookies.get("auth_cookie")?.value;

  // * Redirect to login page if no cookie
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // * Authenticate cookie if exists
  const authResponse = await fetch(
    `${NEXT_PUBLIC_AUTH_API_BASEURL}/api/authentication`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    },
  );

  // * Authentication failed: Redirect to login page
  if (!authResponse.ok) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // * Authentication successful: Fetch user data
  const userData = await authResponse.json();

  // * Set user data header and return
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-data", JSON.stringify(userData));

  return NextResponse.next({ headers: requestHeaders });
}

export const config = {
  matcher: ["/admin/:path", "/dashboard", "/profile-submissions"],
};
