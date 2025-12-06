import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { getCookie } from "cookies-next/server";

export async function middleware(request: NextRequest) {
  const token = await getCookie("access_token", { cookies });
  // if (!token) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }
}

export const config = {
  matcher: ["/"],
};
