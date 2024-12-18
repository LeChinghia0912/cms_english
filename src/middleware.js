import { get } from "lodash";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
    cookieName: "token",
  });

  const role = get(token, ["user", "role"]);

  if (token && role !== "admin") return NextResponse.redirect(new URL("/404", request.url));
  if (pathname !== "/login" && !token) return NextResponse.redirect(new URL("/login", request.url));
  if (token && pathname === "/login") return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/", "/seo", "/login", "/decentralization", "/chapter:path*", "/feedback", "/report"],
};
