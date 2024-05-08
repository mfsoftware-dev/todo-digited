import {SessionUser} from "next-auth";
import Image from "next/image";
import UserImg from "@/public/assets/user.png";
import React from "react";
import useProfileModal from "@/app/hooks/useProfileModal";
import {FaEdit} from "react-icons/fa";
import useMobileNavigationDrawer from "@/app/hooks/useMobileNavigationDrawer";

interface NavigationUserInfoProps {
    user?: SessionUser
}

const NavigationUserInfo = ({user}: NavigationUserInfoProps) => {

    const mobileNavigationDrawer = useMobileNavigationDrawer();
    const profileModal = useProfileModal();
    
    const editProfile = () => {
        mobileNavigationDrawer.closeDrawer();
        profileModal.openModal();
    }
    
    if(!user) return null;
    
    return (
        <div className={"flex space-x-3 items-center"}>
            <Image src={user.image ?? UserImg} alt={"User Avatar"} width={60} height={60} className={"rounded-lg border size-[60px]"}/>
            <div className={"flex flex-col flex-grow w-full overflow-hidden"}>
                <p className={"text-lg font-bold truncate whitespace-nowrap"}>{user.name}</p>
                <span className={"text-xs truncate whitespace-nowrap"}>{user.email}</span>
            </div>
            <div className={"hover:scale-110 hover:text-blue-500 transition cursor-pointer"} onClick={() => profileModal.openModal()}>
                <FaEdit size={20}/>
            </div>
        </div>
    )
}

export default NavigationUserInfo