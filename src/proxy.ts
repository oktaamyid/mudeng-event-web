import { NextRequest, NextResponse } from "next/server";
import { updateSession, getSession } from "@/lib/auth/session";

const protectedRoutes = ["/admin", "/dashboard"];
const publicRoutes = ["/sign-in"];

export default async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;
    
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    const isPublicRoute = publicRoutes.some(route => path.startsWith(route));
    
    // Decrypt session from cookie
    const session = await getSession();
    
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
    }

    if (path.startsWith("/admin") && session?.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    
    if (isPublicRoute && session?.userId) {
        if (session.role === "admin") {
            return NextResponse.redirect(new URL("/admin", req.nextUrl));
        } else {
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
        }
    }
    
    return await updateSession(req) || NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
