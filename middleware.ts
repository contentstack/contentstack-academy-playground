
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  return NextResponse.next({ headers });
}

export const config = {
    matcher: [
        // match all routes except static files, APIs, and specific stylesheets
        "/((?!api|_next/static|_next/image|favicon.ico|styles/.+|icon/.+).*)",
    ],
};