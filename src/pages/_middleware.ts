import { getToken } from 'next-auth/jwt'
import { NextResponse, NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET ?? ''

export async function middleware(req: NextRequest) {
  // Token will exist if the user is logged in
  const token = await getToken({ req, secret: JWT_SECRET })

  const { pathname } = req.nextUrl

  if (token && pathname === '/login') {
    // redirect '/' when the user has already logged in
    return NextResponse.redirect('/')
  }

  // Allow the requests if the following is true...
  // 1. its a request for next-auth session & provider fetching
  // 2. if the token exists
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  // redirect them to login page if they dont have token & are requesting a protected route
  if (!token && pathname !== '/login') {
    // ログインページに返す
    return NextResponse.redirect('/login')
  }
}
