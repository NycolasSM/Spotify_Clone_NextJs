import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server"

export async function middleware(req) {
  // Token will exists if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl

  // Allow therequests if th following is true
  // 1) its a request for next-auth session & provider fetching
  // 2) the token exists

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // Redirect them to login if they dont have token and are requesting aprotected route
  if(!token && pathname !== '/login') {
    return NextResponse.redirect("/login");
  }
}