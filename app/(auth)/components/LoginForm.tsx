"use client"

import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {FcGoogle} from "react-icons/fc";
import {toast} from "react-hot-toast";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import Input from "@/app/components/input/Input";
import Button from "@/app/components/ui/Button";
import LogInWithGoogle from "@/app/components/ui/LogInWithGoogle";
import {MdLogin} from "react-icons/md";

const LoginForm = () => {
    
    const router = useRouter();
    
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FieldValues>()
    
    const logIn: SubmitHandler<FieldValues> = (data: FieldValues) => {
        if(!data.email || !data.password) return toast("I dati inseriti non sono corretti");

        setIsLoading(true);

        signIn("credentials", {
            email: data.email,
            password: data.password,
            callbackUrl: `${window.location.origin}/`,
            redirect: false
        }).then((result) => {
            if (result?.error) return toast.error(result.error);
            router.push("/today-tasks");
        }).catch((error) => {
            toast.error(error.response.data);
        }).finally(() => {
            setIsLoading(false);
        })
    }
    
    const signInWithGoogle = () => {
        if(isLoading) return;
        
        setIsLoading(true);
        
        signIn("google").then((result) => {
            if (result?.error) return toast(result.error);
            router.push("/today-tasks");
        }).catch((error) => {
            toast.error(error.response.data);
        }).finally(() => {
            setIsLoading(false);
        })
    }
    
    return (
        <div className={"w-full"}>
            <form onSubmit={handleSubmit(logIn)} className={"flex flex-col space-y-5"}>
                <div className={"flex flex-col space-y-3"}>
                    <Input id={"email"} label={"Indirizzo E-Mail"} placeholder={"Inserisci il tuo indirizzo E-Mail"} register={register} errors={errors} type={"email"} disabled={isLoading}/>
                    <Input id={"password"} label={"Password"} placeholder={"Inserisci la password di accesso"} register={register} errors={errors} type={"password"} disabled={isLoading}/>
                </div>
                <Button htmlType={"submit"} icon={MdLogin} disabled={isLoading}>Accedi</Button>
            </form>
            <div className={"flex items-center justify-between my-5 space-x-5"}>
                <hr className={"w-full"}/>
                <span className={"text-sm font-semibold"}>Oppure</span>
                <hr className={"w-full"}/>
            </div>
            <LogInWithGoogle onClick={signInWithGoogle} disabled={isLoading} />
        </div>
    )
}

export default LoginForm