import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";

export function middleware(req: {
  cookies: { get: (arg0: string) => { (): any; new (): any; value: any } };
  url: string | URL;
  nextUrl: string | URL | undefined;
}) {
  const cookie = req.cookies.get("token")?.value;

  const { token, role } = cookie
    ? JSON.parse(cookie)
    : {
        token: null,
        role: null,
      };
  const pathname = new URL(req.url).pathname;

  const isNotPublicRoutes = ["/keranjang"];
  const islogin = ["/login"];

  if (islogin.includes(pathname) && token) {
    const dashboardUrl = new URL("/", req.nextUrl).href;
    return NextResponse.redirect(dashboardUrl);
  }

  if (isNotPublicRoutes.includes(pathname) && !token) {
    const loginUrl = new URL("/login", req.nextUrl).href;
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
