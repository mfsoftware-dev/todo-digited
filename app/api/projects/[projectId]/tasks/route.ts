import {NextResponse} from "next/server";
import {getLoggedUser} from "@/app/actions/users";
import prisma from "@/app/libs/prismadb";
import {addDays} from "date-fns";

interface IParams {
    projectId?: string
}

export async function GET(request: Request, { params }: { params: IParams }) {
    try {

        const {projectId} = params;
        const loggedUser = await getLoggedUser();
        
        if(!loggedUser) return new NextResponse("Operazione non consentita", {status: 500})
        
        const items = await prisma.task.findMany({
            where: {
                projectId,
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        
        return NextResponse.json({
            items
        })
    } catch (error) {
        if(process.env.NODE_ENV !== "production") console.log("getUpcomingTaskList", error);
        return new NextResponse("Si è verificato un errore, riprova", {status: 500})
    }
}