import {getLoggedUser} from "@/app/actions/users";
import {redirect} from "next/navigation";

export default async function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    const loggedUser = await getLoggedUser();
    
    if(loggedUser) redirect("/today-tasks");

    return (
        <>
            {children}
        </>
    );
}
