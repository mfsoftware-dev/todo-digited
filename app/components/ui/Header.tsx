"use client"

import {IoMenu} from "react-icons/io5";
import useMobileNavigationDrawer from "@/app/hooks/useMobileNavigationDrawer";

interface HeaderProps {
    title: string,
}

const Header = ({title}: HeaderProps) => {
    
    const mobileNavigationDrawer = useMobileNavigationDrawer();
    
    return (
        <div className={"py-5 flex justify-between"}>
            <p className={"capitalize text-3xl font-bold"}>{title}</p>
            <div className={"md:hidden"} onClick={() => mobileNavigationDrawer.openDrawer()}>
                <IoMenu size={30} />
            </div>
        </div>
    )
}

export default Header