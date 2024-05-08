import Navigation from "@/app/components/navigation/Navigation";
import TaskDrawer from "@/app/(protected)/components/TaskDrawer";
import Image from "next/image";
import Background from "@/public/assets/login.jpg";
import ContextProvider from "@/app/components/ContextProvider";
import MobileNavigationDrawer from "@/app/(protected)/components/MobileNavigationDrawer";

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={"relative"}>
            <Image src={Background} alt={"Login Background"} className={"w-screen h-screen object-cover absolute -z-10"}/>
            <div className={"w-screen h-screen bg-white/95 absolute -z-10"}/>
            <div>
                <div className={"hidden md:block"}>
                    <ContextProvider>
                        <Navigation/>
                    </ContextProvider>
                </div>
                <div className={"md:ps-[var(--navigation-width)]"}>
                    <div className={"p-5 md:px-20 md:py-10 w-full z-10"}>
                        {children}
                    </div>
                </div>
            </div>
            <MobileNavigationDrawer/>
        </div>
    );
}
