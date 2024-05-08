"use client"

import {useEffect, useMemo, useState} from "react";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import useTaskDrawer from "@/app/hooks/task/useTaskDrawer";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {toast} from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import Input from "@/app/components/input/Input";
import Button, {ButtonType} from "@/app/components/ui/Button";
import {MdClose} from "react-icons/md";
import TextArea from "@/app/components/input/TextArea";
import {TaskPriority} from "@prisma/client";
import Select from "@/app/components/input/Select";
import { isMobile } from 'react-device-detect';
import {taskPriorityLabel} from "@/app/helpers/taskPriority";
import Checkbox from "@/app/components/input/Checkbox";
import {format} from "date-fns";
import {it} from "date-fns/locale";
import useProjectStore from "@/app/hooks/project/useProjectStore";

interface TaskDrawerProps {
    onChange: () => void,
}

const TaskDrawer = ({onChange}: TaskDrawerProps) => {
    
    const {projects, fetchProjects} = useProjectStore();
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {task, isOpen, closeDrawer} = useTaskDrawer();
    
    useEffect(() => {
        setIsMounted(true);
    }, [])
    
    useEffect(() => {
        setValue("projectId", task?.projectId ?? "");
        setValue("name", task?.name ?? "");
        setValue("description", task?.description ?? "");
        setValue("priority", task?.priority ?? "");
        setValue("completed", task?.completed ?? false);
        setValue("expiresAt", task?.expiresAt ? format(task.expiresAt, "yyyy-MM-dd", {locale: it}) : new Date());
    }, [task])

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>()

    const updateTask: SubmitHandler<FieldValues> = (data: FieldValues) => {
        if(!data.name  || !data.priority || !data.expiresAt) return toast("Assicurati di aver compilato tutti i campi richiesti");
        
        setIsLoading(true);

        axios.patch(`/api/tasks/${task?.id}`, data).then((res) => {
            if(res.status !== 200) return toast.error(res.statusText);
            toast.success(res.data.message);
            closeDrawer();
            onChange();
        }).catch((error) => {
            toast.error(error.response.data);
        }).finally(() => {
            setIsLoading(false);
        })
    }
    
    const deleteTask = () => {
        
        setIsLoading(true);
        
        axios.delete(`/api/tasks/${task?.id}`).then((res) => {
            if(res.status !== 200) return toast.error(res.statusText);
            toast.success(res.data.message);
            fetchProjects();
            closeDrawer();
            onChange();
        }).catch((error) => {
            toast.error(error.response.data);
        }).finally(() => {
            setIsLoading(false);
        })
    }
    
    const taskPrioritiesList = Object.keys(TaskPriority).map((priority) => ({
        label: taskPriorityLabel(priority),
        value: priority
    }))
    
    const completed = watch("completed");
    
    const formattedProjectList = useMemo(() => {
        if(!projects) return [];
        return projects.map((project) => ({
            label: project.name,
            value: project.id
        }))
    }, [projects]);

    if(!isMounted) return null;
    
    return (
        <Drawer open={isOpen} size={isMobile ? "100%" : 600} onClose={closeDrawer} direction={"right"}>
            <div className={"p-5 flex flex-col space-y-5 h-full"}>
                <div className={"flex justify-between items-center"}>
                    <p className={"font-bold text-xl"}>{task?.name}</p>
                    <div onClick={closeDrawer}>
                        <MdClose size={25}/>
                    </div>
                </div>
                <hr/>
                <form onSubmit={handleSubmit(updateTask)} className={"flex flex-col space-y-5 h-full"}>
                    <div className={"h-full"}>
                        <div className={"py-3 grid grid-cols-1 md:grid-cols-2 gap-5"}>
                            <div className={"col-span-2"}>
                                <Input id={"name"} label={"Nome"} placeholder={"Inserisci il nome del task"} register={register} errors={errors} required disabled={isLoading}/>
                            </div>
                            <div className={"col-span-2"}>
                                <TextArea id={"description"} label={"Descrizione"} rows={10} placeholder={"Inserisci una descrizione per questo task"} register={register} errors={errors} disabled={isLoading}/>
                            </div>
                            <div className={"col-span-2"}>
                                <Select id={"projectId"} label={"Progetto"} items={formattedProjectList} register={register} errors={errors} disabled={isLoading}/>
                            </div>
                            <Input id={"expiresAt"} label={"Scadenza"} type={"date"} register={register} errors={errors} required disabled={isLoading}/>
                            <Select id={"priority"} label={"Priorità"} items={taskPrioritiesList} register={register} errors={errors} required disabled={isLoading}/>
                            <Checkbox label={"Completata"} value={completed} onChange={(value) => setValue("completed", value)} />
                        </div>
                    </div>

                    <hr/>

                    <div className={"flex space-x-3 items-center justify-start mt-3"}>
                        <Button htmlType={"submit"} disabled={isLoading}>Salva Dati</Button>
                        <Button htmlType={"submit"} type={ButtonType.DANGER} disabled={isLoading} onClick={deleteTask}>Elimina</Button>
                    </div>
                </form>
            </div>
        </Drawer>
    )
}

export default TaskDrawer