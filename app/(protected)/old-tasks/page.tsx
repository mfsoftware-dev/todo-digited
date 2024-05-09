import {Metadata} from "next";
import Header from "@/app/components/ui/Header";
import OldTaskList from "@/app/(protected)/old-tasks/components/OldTaskList";

export const metadata: Metadata = {
    title: "Task passati",
};

export default function OldTasks() {
    return (
        <>
            <Header title={"Task Passati"} />
            <div className={"mt-10"}>
                <OldTaskList/>
            </div>
        </>
    )
}