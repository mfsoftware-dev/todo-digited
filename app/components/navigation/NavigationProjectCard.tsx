"use client"

import Link from "next/link";
import React from "react";
import {usePathname} from "next/navigation";
import {CiBoxList} from "react-icons/ci";
import {FaEdit} from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";
import {ProjectExt} from "@/app/types";
import useMobileNavigationDrawer from "@/app/hooks/useMobileNavigationDrawer";

interface NavigationProjectCardProps {
    project: ProjectExt,
    onEdit: () => void,
    onDelete: () => void
}

const NavigationProjectCard = ({project, onEdit, onDelete}: NavigationProjectCardProps) => {

    const mobileNavigationDrawer = useMobileNavigationDrawer();
    const pathName = usePathname()
    const isActive = (pathName.includes(project.id));
    const tasksToComplete = project.tasks.filter((task) => !task.completed).length;
    
    return (
        <div key={project.id} className={`rounded-md h-10 px-4 w-full flex space-x-3 items-center hover:text-white hover:bg-blue-500 transition group ${isActive && "font-bold bg-blue-500 text-white"}`}>
            <Link onClick={mobileNavigationDrawer.closeDrawer} className={"flex space-x-3 items-center flex-grow"} href={`/projects/${project.id}`}>
                <CiBoxList size={20}/>
                <p className={"text-sm"}>{project.name}</p>
            </Link>
            {tasksToComplete > 0 && (
                <div className={"group-hover:hidden size-6 flex items-center justify-center bg-gray-100 rounded-md"}>
                    <span className={"text-[10px] text-black font-bold"}>{tasksToComplete}</span>
                </div>
            )}
            <div className={"flex md:hidden md:group-hover:flex space-x-2 items-center text-white"}>
                <FaEdit size={15} className={"hover:scale-105 transition cursor-pointer"} onClick={onEdit}/>
                <MdDeleteForever size={15} className={"hover:scale-105 transition cursor-pointer"} onClick={onDelete}/>
            </div>
        </div>
    )
}

export default NavigationProjectCard