import getCurrentSession from "./session";

export async function getLoggedUser() {
    try {
        const session = await getCurrentSession();

        if(!session) return null;

        if(!session?.user) return null;

        return session.user;
    } catch (error: any) {
        return null;
    }
}