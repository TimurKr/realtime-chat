import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareSupabase } from "@/utils/supabase/middleware";
import { Route } from "next";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareSupabase(request);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const protectedRoutes: Route[] = ["/messages"];
  const onlyPublicRoutes: Route[] = ["/auth/login", "/auth/signup"];

  if (!session && protectedRoutes.includes(request.nextUrl.pathname as Route)) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }
  if (
    !!session &&
    onlyPublicRoutes.includes(request.nextUrl.pathname as Route)
  ) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
