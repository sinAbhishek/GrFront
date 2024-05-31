

import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside


export function middleware(request) {
  
  // var value=null
  // if (typeof window !== "undefined") {
  //   value =  JSON.parse(localStorage.getItem("joinedroom"))
   
  // }
    
    // if(value!==null){
    //     return NextResponse.redirect(new URL('/', request.url))
    // }
    // if (request.nextUrl.pathname.startsWith('/about')) {
        
    //     return NextResponse.rewrite(new URL('/', request.url))
    //   }
    //   if (request.nextUrl.pathname.startsWith('/dashboard')) {
    //     return NextResponse.rewrite(new URL('/dashboard/user', request.url))
    //   }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/room/:path*',
}