"use client"

import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import {useEffect, useState} from "react";
import Navigation from "@/app/components/navigation/Navigation";
import useMobileNavigationDrawer from "@/app/hooks/useMobileNavigationDrawer";
import {SessionProvider} from "next-auth/react";

const MobileNavigationDrawer = () => {
    
    const {isOpen, closeDrawer} = useMobileNavigationDrawer();
    
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) return null;

    return (
        <Drawer open={isOpen} size={"100%"} onClose={closeDrawer} direction={"left"} zIndex={1}>
            <SessionProvider>
                <Navigation/>
            </SessionProvider>
        </Drawer>
    )
}

export default MobileNavigationDrawer