"use client"

import Button, {ButtonType} from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";

interface DialogProps {
    isOpen: boolean,
    title: string,
    message: string
    onConfirm: () => void,
    onCancel: () => void,
}

const Dialog = ({isOpen, title, message, onConfirm, onCancel}: DialogProps) => {
    return (
        <Modal isOpen={isOpen} title={title} onClose={onCancel}>
            <span className={"text-md"}>{message}</span>
            <div className={"flex space-x-3 items-center justify-end mt-3"}>
                <Button onClick={onCancel} type={ButtonType.SECONDARY}>Chiudi</Button>
                <Button onClick={onConfirm}>Conferma</Button>
            </div>
        </Modal>
    )
}

export default Dialog