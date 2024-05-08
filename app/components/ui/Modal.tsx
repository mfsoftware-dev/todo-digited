"use client"

import React from "react";
import {Description, Dialog, DialogPanel, DialogTitle, Transition} from "@headlessui/react";

interface ModalProps {
    title?: string,
    description?: string,
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode,
}

const Modal = ({title, description, isOpen, onClose, children}: ModalProps) => {
    return (
        <Transition show={isOpen} enter={"duration-200 ease-out"} enterFrom={"opacity-0"} enterTo={"opacity-100"} leave={"duration-300 ease-out"} leaveFrom={"opacity-100"} leaveTo={"opacity-0"}>
            <Dialog onClose={onClose} className={"relative z-[100] transition"}>
                <div className={"fixed inset-0 bg-black/30"} aria-hidden={"true"}/>
                <div className={"fixed inset-0 flex w-screen items-center justify-center p-4"}>
                    <DialogPanel className={"max-w-md w-full space-y-4 bg-white/95 p-5 border rounded-lg shadow-md"}>
                        <DialogTitle className="font-bold">{title}</DialogTitle>
                        {description && <Description>{description}</Description>}
                        {children}
                    </DialogPanel>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Modal