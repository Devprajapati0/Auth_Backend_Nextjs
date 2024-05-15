import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    console.log("path::",path);

    const isPublicUrl = path === '/login' || path === '/signup' || path === '/redirectpage' || path === '/verifyemail';

    const token = request.cookies.get('token') || '';

    if(isPublicUrl && token ){
        return NextResponse.redirect(new URL('/profile',request.nextUrl))
    }

    if(!isPublicUrl && !token){
        return NextResponse.redirect(new URL('/login',request.nextUrl))
    }
        
 
}
 
// See "Matching Paths" below to learn more

//files for which this middlware should run
export const config = {
  matcher: [
    '/profile',
    '/verifyemail',
    '/redirectpage',
    '/signup',
    '/login',
    '/[id]',
    '/'

  ],
}