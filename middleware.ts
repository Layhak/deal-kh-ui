import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest){
    console.log("========== Middleware handling redirect to Credential Login or Registeration =========== ");
    console.log("request url: ", req.url);
    console.log("request method: ", req.method);
    const cookies = req.cookies;
    const session = cookies.get("authjs.session-token")
    console.log("session: ",session);
    
    // when have no session
    if(!session){
        return NextResponse.redirect(new URL('/login',req.url))
    }
}

// define when user visited these page and redirect into page when have no session
export const config = {
    matcher: ['/cart','/wishlist', '/profile'],
}