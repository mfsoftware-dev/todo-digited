"use client"

import {IoMenu} from "react-icons/io5";
import useMobileNavigationDrawer from "@/app/hooks/useMobileNavigationDrawer";
import styles from "../../styles/ui/header.module.scss";

interface HeaderProps {
    title: string,
}

const Header = ({title}: HeaderProps) => {
    
    const mobileNavigationDrawer = useMobileNavigationDrawer();
    
    return (
        <div className={styles.container}>
            <p className={styles.title}>{title}</p>
            <div className={styles.menuIconContainer} onClick={mobileNavigationDrawer.openDrawer}>
                <IoMenu size={30} />
            </div>
        </div>
    )
}

export default Header