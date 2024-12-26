import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token"); // Get the token from cookies

  if (!token) {
    console.log("no token logout");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Define which paths the middleware should run on
export const config = {
  matcher: "/cart", // Middleware will only run for the /cart route
};
