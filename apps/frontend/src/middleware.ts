import { NextResponse, type NextRequest } from "next/server";
import { siteForHost } from "@/lib/siteForHost";

/**
 * Host-based routing: research.<domain> serves the /research route, so each site
 * gets its own hostname out of one deployment. The path stays clean because this
 * is a rewrite, not a redirect. `/research` still works on the main domain, and
 * staging hosts (staging.research.…, research-staging.…) resolve the same way.
 */
export function middleware(request: NextRequest) {
  const basePath = siteForHost(request.headers.get("host"));
  if (!basePath) return NextResponse.next();

  const url = request.nextUrl.clone();
  // Already inside the site's routes (or an admin/API request): leave it alone.
  if (url.pathname === basePath || url.pathname.startsWith(`${basePath}/`)) {
    return NextResponse.next();
  }

  url.pathname = url.pathname === "/" ? basePath : `${basePath}${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except the CMS, Next internals and static files.
  matcher: ["/((?!admin|api|_next|favicon.ico|.*\\..*).*)"],
};
