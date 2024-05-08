import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface SessionUser {
        id: string,
        name: string,
        email: string,
        image: string
    }

    interface Session extends DefaultSession {
        user?: SessionUser
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string,
        name: string,
        email: string,
        image: string
    }
}