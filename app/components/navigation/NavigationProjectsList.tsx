"use client"

import {ProjectExt} from "@/app/types";
import NavigationProjectCard from "@/app/components/navigation/NavigationProjectCard";
import React from "react";
import useProjectModal from "@/app/hooks/project/useProjectModal";
import useDeleteProjectModal from "@/app/hooks/project/useDeleteProjectModal";

interface NavigationProjectsListProps {
    projects: ProjectExt[],
}

const NavigationProjectsList = ({projects}: NavigationProjectsListProps) => {

    const projectModal = useProjectModal();
    const deleteProjectModal = useDeleteProjectModal();
    
    return (
        <>
            {projects ? (
                <div className={"flex flex-col space-y-2"}>
                    {projects.map((project) => {
                        return <NavigationProjectCard key={project.id} project={project} onEdit={projectModal.openModal.bind(this, project)} onDelete={deleteProjectModal.openModal.bind(this, project)}/>
                    })}
                </div>
            ) : (
                <p className={"text-sm"}>Nessun progetto inserito</p>
            )}
        </>
    )
}

export default NavigationProjectsList