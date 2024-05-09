"use client"

import {useEffect, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {useSession} from "next-auth/react";
import useProfileModal from "@/app/hooks/useProfileModal";
import Modal from "@/app/components/ui/Modal";
import Input from "@/app/components/input/Input";
import Button, {ButtonType} from "@/app/components/ui/Button";
import {toast} from "react-hot-toast";
import useAuth from "@/app/hooks/useAuth";
import {MdClose} from "react-icons/md";
import {FaCheck} from "react-icons/fa";

const ProfileModal = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    
    const {data: sessionData, update: updateSession} = useSession();
    const {isOpen, closeModal} = useProfileModal();
    const {fetchLoggedUser} = useAuth();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FieldValues>()

    useEffect(() => {
        setValue("name", sessionData?.user?.name ?? "");
        setValue("email", sessionData?.user?.email ?? "");
    }, [sessionData?.user]);

    const updateProfile: SubmitHandler<FieldValues> = (data: FieldValues) => {
        setIsLoading(true);

        axios.patch("/api/profile", data).then((res) => {
            if(res.status !== 200) return toast.error(res.statusText);

            updateSession({
                user: {
                    ...sessionData?.user,
                    ...res.data.user
                }
            }).then(() => {
                fetchLoggedUser();
                toast.success(res.data.message);
                closeModal();
            })
        }).catch((error) => {
            toast.error(error.response.data);
        }).finally(() => {
            setIsLoading(false);
        })
    }
    
    return (
        <Modal isOpen={isOpen} title={"Modifica Profilo"} onClose={closeModal}>
            <form onSubmit={handleSubmit(updateProfile)}>
                <div className={"flex flex-col space-y-3"}>
                    <Input id={"name"} label={"Nome"} placeholder={"Inserisci il tuo nome"} register={register} errors={errors} required disabled={isLoading}/>
                    <Input id={"email"} label={"Indirizzo E-Mail"} placeholder={"Inserisci il tuo indirizzo E-Mail"} register={register} errors={errors} required type={"email"} disabled={isLoading}/>
                </div>
                <hr className={"my-5"}/>
                <div className={"flex space-x-3 items-center justify-end"}>
                    <Button disabled={isLoading} onClick={closeModal} icon={MdClose} type={ButtonType.SECONDARY}>Chiudi</Button>
                    <Button htmlType={"submit"} disabled={isLoading} icon={FaCheck}>Conferma</Button>
                </div>
            </form>
        </Modal>
    )
}

export default ProfileModal