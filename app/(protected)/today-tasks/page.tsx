import {format} from "date-fns";
import {it} from "date-fns/locale";
import {Metadata} from "next";
import Header from "@/app/components/ui/Header";
import TodayTaskList from "@/app/(protected)/today-tasks/components/TodayTaskList";

export const metadata: Metadata = {
    title: "Task di oggi",
};

export default function TodayTasks() {
    return (
        <>
            <Header title={format(new Date(), "dd MMMM yyyy", {locale: it})} />
            <div className={"mt-10"}>
                <TodayTaskList/>
            </div>
        </>
    )
}