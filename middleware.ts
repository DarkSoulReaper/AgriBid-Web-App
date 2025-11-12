import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Routes that don't require authentication
const publicRoutes = ["/", "/auth/login", "/auth/signup"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname === route)

  if (isPublicRoute) {
    return NextResponse.next()
  }

  const authToken = request.cookies.get("authToken")?.value
  const userType = request.cookies.get("userType")?.value

  if (!authToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (pathname.startsWith("/farmer") && userType !== "farmer") {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (pathname.startsWith("/buyer") && userType !== "buyer") {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (pathname.startsWith("/admin") && userType !== "admin") {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
