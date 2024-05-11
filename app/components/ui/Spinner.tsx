import {AiOutlineLoading} from "react-icons/ai";

interface SpinnerProps {
    message?: string
}

const Spinner = ({message}: SpinnerProps) => {
    return (
        <div className={"flex items-center"}>
            <AiOutlineLoading size={20} className={"animate-spin"} />
            {message && <p className={"ms-3 font-semibold"}>{message}</p>}
        </div>
    )
}

export default Spinner