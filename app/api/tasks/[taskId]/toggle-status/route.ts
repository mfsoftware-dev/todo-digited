import {NextResponse} from "next/server";
import {getLoggedUser} from "@/app/actions/users";
import prisma from "@/app/libs/prismadb";

interface IParams {
    taskId?: string
}

export async function PATCH(request: Request, { params }: { params: IParams }){
    try {
        
        const {taskId} = params;
        
        const loggedUser = await getLoggedUser();

        if(!loggedUser) return new NextResponse("Operazione non consentita", {status: 500});
        
        const task = await prisma.task.findUnique({
            where: {
                id: taskId
            }
        })
        
        if(!task) return new NextResponse(`Nessun task trovato con l'ID ${taskId}`, {status: 404});

        const updatedTask = await prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                completed: !task.completed
            }
        })

        return NextResponse.json({
            message: "Task aggiornato con successo",
            data: updatedTask.id
        })

    } catch (error) {
        if(process.env.NODE_ENV !== "production") console.log("updateTaskStatus", error);
        return new NextResponse("Si è verificato un errore, riprova", {status: 500});
    }
}