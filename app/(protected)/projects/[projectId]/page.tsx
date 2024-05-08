import {fetchProjectById} from "@/app/actions/projects";
import ProjectTaskList from "@/app/(protected)/projects/[projectId]/components/ProjectTaskList";
import {Metadata} from "next";
import {format} from "date-fns";
import {it} from "date-fns/locale";
import Header from "@/app/components/ui/Header";

interface IParams {
    projectId: string;
}

export default async function ProjectInfo({params}: {params: IParams}) {

    const { projectId } = params;
    
    const project = await fetchProjectById(projectId);
    
    if(!project) return null;
    
    return (
        <>
            <Header title={project.name} />
            <div className={"mt-10"}>
                <ProjectTaskList project={project} />
            </div>
        </>
    )
}

export async function generateMetadata({params}: {params: IParams}): Promise<Metadata | null> {
    const project = await fetchProjectById(params.projectId);
    if (project) {
        return {
            title: project.name,
        }
    } else {
        return null;
    }
}