"use client"

import {SessionProvider} from "next-auth/react";

interface ContextProviderProps {
    children: React.ReactNode
}

const ContextProvider = ({children}: ContextProviderProps) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default ContextProvider