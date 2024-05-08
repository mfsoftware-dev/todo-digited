import Image from "next/image";
import Background from "@/public/assets/login.jpg"
import LoginForm from "@/app/(auth)/components/LoginForm";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Login",
};

export default function Home() {
    return (
        <div className={"w-screen h-screen rounded-lg relative"}>
            <Image src={Background} alt={"Login Background"} className={"size-full object-cover absolute"} />
            <div className={"size-full bg-white/50 absolute"}/>
            <div className={"size-full flex items-center justify-center absolute"}>
                <div className={"max-w-md mx-auto w-full p-10 rounded-lg shadow-md bg-white/95 flex flex-col space-y-10"}>
                    <div className={"flex flex-col space-y-3"}>
                        <p className={"text-4xl font-bold"}>Benvenuto</p>
                        <span className={"text-sm"}>Inserisci le tue credenziali per effettuare l&apos;accesso</span>
                    </div>
                    <LoginForm/>
                </div>
            </div>
        </div>
    );
}
