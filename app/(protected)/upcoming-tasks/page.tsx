import UpcomingTaskList from "@/app/(protected)/upcoming-tasks/components/UpcomingTaskList";
import {Metadata} from "next";
import Header from "@/app/components/ui/Header";

export const metadata: Metadata = {
    title: "Prossimi task",
};

export default function UpcomingTasks() {
    return (
        <>
            <Header title={"Prossimi Task"} />
            <div className={"mt-10"}>
                <UpcomingTaskList/>
            </div>
        </>
    )
}