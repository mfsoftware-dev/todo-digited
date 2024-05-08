import {NextAuthOptions, SessionUser} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "@/app/libs/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),

    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) throw new Error("Nome utente e/o password errati, riprova.");

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user || !user?.password) throw new Error("Il nome utente inserito non corrisponde a nessun utente registrato.");

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);

                if(!isCorrectPassword) throw new Error("La password inserita non è corretta, riprova.");
                
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email
                } as SessionUser;
            }
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],

    debug: process.env.NODE_ENV === 'development',

    session: {
        strategy: 'jwt',
    },

    pages: {
        signIn: '/',
        signOut: '/'
    },

    callbacks: {
        async jwt({token, user, trigger, session}) {

            if(trigger === "update"){
                return {...token, ...session.user}
            }

            return {...token, ...user}
        },

        async session({session, token, user}) {
            session.user = token as any;
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};