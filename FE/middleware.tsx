// use created middleware in pages
import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'


export default async function handler(req: NextRequest) {
  // check if token is valid
  try {
    let token = req.headers.get('token')
    let url = req.nextUrl
    url.pathname = '/login'
    if (!token) {
      return NextResponse.rewrite(url)
    }
    token = token.toString().replace("Bearer ", "")
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret)
    if (!payload) {
      return NextResponse.rewrite(url)
    }
    const response = NextResponse.next()
    response.cookies.set('auth', token)
    return response
  } catch (err) {
    let url = req.nextUrl
    url.pathname = '/login'
    return NextResponse.rewrite(url)
  }
}

export const config = {
  matcher: ['/api/posts/:path*','/api/articles/:path*'],
  withContext: true
}

