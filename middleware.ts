import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req, event) {
        
        },
    {
        callbacks: {
            authorized: ({ token }) => (token != null),
        },
        pages: {
            signIn: "/",
            signOut: "/",
        }
    }
);

export const config = {
    matcher: [
        "/profile/:path*",
        "/dashboard/:path*",
        "/projects/:path*",
    ]
}