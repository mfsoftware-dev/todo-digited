"use client"

import Link from "next/link";
import React from "react";
import {IconType} from "react-icons";
import {usePathname} from "next/navigation";
import useMobileNavigationDrawer from "@/app/hooks/useMobileNavigationDrawer";

interface NavigationLinkCardProps {
    title: string,
    icon: IconType,
    href: string,
}

const NavigationLinkCard = ({title, icon: Icon, href}: NavigationLinkCardProps) => {

    const mobileNavigationDrawer = useMobileNavigationDrawer();
    const pathName = usePathname()
    const isActive = (pathName.includes(href));
    
    return (
        <Link onClick={mobileNavigationDrawer.closeDrawer} href={href} className={`rounded-md h-10 px-4 w-full flex space-x-3 items-center hover:text-white hover:bg-blue-500 transition cursor-pointer ${isActive && "text-white bg-blue-500"}`}>
            <Icon size={20}/>
            <p className={"text-sm"}>{title}</p>
        </Link>
    )
}

export default NavigationLinkCard