import { NextResponse } from "next/server";

export async function middleware(request) {
  const response = NextResponse.next();

  // Add security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "origin-when-cross-origin");

  // Prefetch product data for product pages
  if (request.nextUrl.pathname.startsWith("/product/")) {
    const productId = request.nextUrl.pathname.split("/")[2];
    response.headers.set(
      "Link",
      `</api/wp/product/${productId}>; rel=prefetch`
    );
  }

  // Prefetch featured products for homepage
  if (request.nextUrl.pathname === "/") {
    response.headers.set("Link", "</api/wp/featured-products>; rel=prefetch");
  }

  return response;
}

export const config = {
  matcher: ["/", "/product/:path*"],
};
