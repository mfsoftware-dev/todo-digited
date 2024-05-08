"use client"

import {useEffect, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";
import useProjectModal from "@/app/hooks/project/useProjectModal";
import Modal from "@/app/components/ui/Modal";
import Button, {ButtonType} from "@/app/components/ui/Button";
import Input from "@/app/components/input/Input";
import TextArea from "@/app/components/input/TextArea";
import useProjectStore from "@/app/hooks/project/useProjectStore";

const ProjectModal = () => {

    const [isLoading, setIsLoading] = useState(false);
    const {project, isOpen, closeModal} = useProjectModal();
    const {fetchProjects} = useProjectStore();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FieldValues>()

    useEffect(() => {
        setValue("name", project?.name ?? "");
        setValue("description", project?.description ?? "");
    }, [project]);

    const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
        setIsLoading(true);

        axios({
            method: (project ? "patch" : "post"),
            url: `/api/projects/${project ? project.id : ""}`,
            data: data
        }).then((res) => {
            if(res.status !== 200) return toast.error(res.statusText);
            toast.success(res.data.message);
            fetchProjects();
            closeModal();
        }).catch((error) => {
            toast(error.response.data);
        }).finally(() => {
            setIsLoading(false);
        })
    }
    
    return (
        <Modal isOpen={isOpen} title={`${project ? "Modifica" : "Aggiungi"} Progetto`} onClose={closeModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={"border-t border-b py-3 flex flex-col space-y-3"}>
                    <Input id={"name"} label={"Nome"} placeholder={"Inserisci il nome del progetto"} register={register} errors={errors} required disabled={isLoading}/>
                    <TextArea id={"description"} label={"Descrizione"} placeholder={"Inserisci una descrizione per questo progetto"} register={register} errors={errors} required disabled={isLoading}/>
                </div>
                <div className={"flex space-x-3 items-center justify-end mt-3"}>
                    <Button disabled={isLoading} onClick={closeModal} type={ButtonType.SECONDARY}>Chiudi</Button>
                    <Button htmlType={"submit"} disabled={isLoading}>Conferma</Button>
                </div>
            </form>
        </Modal>
    )
}

export default ProjectModal