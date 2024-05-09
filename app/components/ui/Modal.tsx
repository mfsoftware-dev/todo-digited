"use client"

import React from "react";
import {Description, Dialog, DialogPanel, DialogTitle, Transition} from "@headlessui/react";
import styles from "../../styles/ui/modal.module.scss"

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
            <Dialog onClose={onClose} className={styles.dialog}>
                <div className={styles.overlay} aria-hidden={"true"}/>
                <div className={"fixed inset-0 flex w-screen items-center justify-center p-4"}>
                    <DialogPanel className={`${styles.panel} space-y-4`}>
                        <DialogTitle className={styles.title}>{title}</DialogTitle>
                        {description && <Description>{description}</Description>}
                        <hr/>
                        {children}
                    </DialogPanel>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Modal