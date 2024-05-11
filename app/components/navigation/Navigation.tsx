"use client"

import {IoExit, IoToday} from "react-icons/io5";
import {IoIosAdd} from "react-icons/io";
import axios from "axios";
import React, {useEffect} from "react";
import useProjectModal from "@/app/hooks/project/useProjectModal";
import useDeleteProjectModal from "@/app/hooks/project/useDeleteProjectModal";
import {RiArrowLeftDoubleFill, RiArrowRightDoubleFill} from "react-icons/ri";
import NavigationLinkCard from "@/app/components/navigation/NavigationLinkCard";
import NavigationUserInfo from "@/app/components/navigation/NavigationUserInfo";
import {signOut} from "next-auth/react";
import NavigationProjectsList from "@/app/components/navigation/NavigationProjectsList";
import Dialog from "@/app/components/ui/Dialog";
import {toast} from "react-hot-toast";
import useProjectStore from "@/app/hooks/project/useProjectStore";
import useAuth from "@/app/hooks/useAuth";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import Spinner from "@/app/components/ui/Spinner";

const Navigation = () => {
    
    const {loggedUser, fetchLoggedUser} = useAuth();
    
    const {projects, fetchProjects} = useProjectStore();
    
    const projectModal = useProjectModal();
    const deleteProjectModal = useDeleteProjectModal();
    
    const queryClient = useQueryClient();
    const { isLoading } = useQuery({queryKey: ["projects"], queryFn: fetchProjects});
    
    const deleteProject = () => {
        if(!deleteProjectModal.project) return;
        
        axios.delete(`/api/projects/${deleteProjectModal.project.id}`).then((res) => {
            if(res.status !== 200) return toast.error(res.statusText);
            toast.success(res.data.message);
        }).catch((error) => {
            toast.error(error.response.data);
        }).finally(() => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        })
    }
    
    useEffect(() => {
        fetchLoggedUser();
    }, [])
    
    return (
        <>
            <div className={"h-full md:h-auto md:fixed md:left-0 md:top-0 md:bottom-0 md:w-[var(--navigation-width)] md:bg-gray-50 md:border md:shadow-lg md:m-5 md:rounded-lg p-5 flex flex-col space-y-5 justify-between z-[10]"}>

                <NavigationUserInfo user={loggedUser}/>

                <hr/>

                <div className={"flex flex-col space-y-2"}>
                    <p className={"text-sm font-semibold uppercase"}>Task</p>
                    <NavigationLinkCard title={"Prossimi"} icon={RiArrowRightDoubleFill} href={"/upcoming-tasks"}/>
                    <NavigationLinkCard title={"Passati"} icon={RiArrowLeftDoubleFill} href={"/old-tasks"}/>
                    <NavigationLinkCard title={"Oggi"} icon={IoToday} href={"/today-tasks"}/>
                </div>

                <hr/>

                <div className={"flex flex-col flex-grow space-y-5"}>
                    <div className={"flex flex-col space-y-3"}>
                        <div className={"flex space-x-3 items-center justify-between"}>
                            <p className={"text-sm font-semibold uppercase"}>Progetti</p>
                            <div onClick={projectModal.openModal.bind(this, undefined)} className={"aspect-square p-1 bg-white rounded-md hover:scale-110 hover:bg-blue-500 hover:text-white border transition cursor-pointer"}>
                                <IoIosAdd size={20}/>
                            </div>
                        </div>

                        <div className={"flex flex-col space-y-3"}>
                            {isLoading ? (
                                <Spinner message={"Recupero i progetti..."}/>
                            ) : (
                                <>
                                    {projects && <NavigationProjectsList projects={projects} />}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <hr/>

                <div onClick={signOut.bind(this, {callbackUrl: "/"})} className={`rounded-md h-10 px-4 w-full flex space-x-3 items-center hover:text-white hover:bg-red-500 transition text-red-500 cursor-pointer`}>
                    <IoExit size={20}/>
                    <p className={"text-sm"}>Esci</p>
                </div>
            </div>
            
            <Dialog isOpen={deleteProjectModal.isOpen} title={"Elimina Progetto"} message={"Sei sicuro di voler eliminare questo progetto? Tutti i task ad esso associati verranno eliminati"} onConfirm={deleteProject} onCancel={deleteProjectModal.closeModal} />
        </>
    )
}

export default Navigation