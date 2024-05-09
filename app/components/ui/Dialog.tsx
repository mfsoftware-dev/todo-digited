"use client"

import Button, {ButtonType} from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";
import {FaCheck} from "react-icons/fa";
import {MdClose} from "react-icons/md";

interface DialogProps {
    isOpen: boolean,
    title: string,
    message: string
    onConfirm: () => void,
    onCancel: () => void,
    danger?: boolean
}

const Dialog = ({isOpen, title, message, onConfirm, onCancel, danger}: DialogProps) => {
    return (
        <Modal isOpen={isOpen} title={title} onClose={onCancel}>
            <span className={"text-md"}>{message}</span>
            <hr/>
            <div className={"flex space-x-3 items-center justify-end mt-3"}>
                <Button onClick={onCancel} type={ButtonType.SECONDARY} icon={MdClose}>Chiudi</Button>
                <Button onClick={onConfirm} icon={FaCheck} type={danger ? ButtonType.DANGER : ButtonType.PRIMARY}>Conferma</Button>
            </div>
        </Modal>
    )
}

export default Dialog