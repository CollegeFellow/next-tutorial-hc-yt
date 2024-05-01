import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = publicPaths.indexOf(path) !== -1
  const token = request.cookies.get('token')?.value || ''

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const isPrivatePath = privatePaths.indexOf(path) !== -1
  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

const publicPaths = ['/login', '/signup']
const privatePaths = ['/', '/profile']

// See "Matching Paths" below to learn more
export const config = {
  matcher: [...privatePaths, ...publicPaths],
}
