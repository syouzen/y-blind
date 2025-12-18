import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { getCookie } from "cookies-next/server";

const notLoginRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const token = await getCookie("access_token", { cookies });
  const { pathname } = request.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (token && notLoginRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url), 307);
  }
}

export const config = {
  matcher: ["/", ...notLoginRoutes],
};
