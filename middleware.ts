import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Force Hungarian for all browsers
  const acceptLang = request.headers.get('accept-language') || '';
  // If the path is not already root and the preferred language is not Hungarian, redirect to root
  if (!request.nextUrl.pathname.startsWith('/hu') && !request.nextUrl.pathname.startsWith('/_next') && !acceptLang.toLowerCase().startsWith('hu')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  // List of old WordPress subpages to redirect
  const oldPages = [
    "/kapcsolat",
    "/contact",
    "/arlista",
    "/szolgaltatasok",
    "/services",
    "/about",
    "/rolunk",
    "/blog",
    "/hirek",
    "/news",
    "/ajanlatkeres",
    "/offer",
    "/ajanlat",
    "/galeria",
    "/gallery",
    "/kapcsolat-contact",
    "/arlista-pricelist",
    "/electric-scooter-servicing",
    "/kerekpar-szerviz-debrecenben",
    "/kontakt-contact",
    "/kerekpar-szerviz-debrecen",
    "/kerekpar-szerviz-debrecen/",
    "/kapcsolat-contact/",
    "/electric-scooter-servicing/",
    "/arlista-pricelist/"
    // Add more as needed
  ];
  const { pathname } = request.nextUrl;
  if (oldPages.includes(pathname.toLowerCase())) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/kapcsolat",
    "/contact",
    "/arlista",
    "/szolgaltatasok",
    "/services",
    "/about",
    "/rolunk",
    "/blog",
    "/hirek",
    "/news",
    "/ajanlatkeres",
    "/offer",
    "/ajanlat",
    "/galeria",
    "/gallery",
    "/kapcsolat-contact",
    "/arlista-pricelist",
    "/electric-scooter-servicing",
    "/kerekpar-szerviz-debrecenben",
    "/kontakt-contact",
    "/kerekpar-szerviz-debrecen"
    // Add more as needed
  ],
};