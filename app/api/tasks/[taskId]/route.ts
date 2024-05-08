import {NextResponse} from "next/server";
import {getLoggedUser} from "@/app/actions/users";
import prisma from "@/app/libs/prismadb";
import {parseISO} from "date-fns";
import * as util from "node:util";

interface IParams {
    taskId?: string
}

export async function PATCH(request: Request, { params }: { params: IParams }){
    try {

        const body = await request.json();

        let {name, priority, description, expiresAt, completed, projectId} = body;
        const {taskId} = params;

        if(!name || !priority || !expiresAt) return new NextResponse("Assicurati di aver compilato tutti i campi richiesti", {status: 500});

        const loggedUser = await getLoggedUser();

        if(!loggedUser) return new NextResponse("Operazione non consentita", {status: 500});
        
        expiresAt = parseISO(expiresAt);
        
        const task = await prisma.task.findUnique({
            where: {
                id: taskId
            }
        })
        
        if(!task) return new NextResponse(`Nessun task trovato con l'ID ${taskId}`, {status: 500});
        
        if(task.projectId) await prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                project: {
                    disconnect: {
                        id: task.projectId!
                    }
                }
            }
        })

        const updatedTask = await prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                name,
                description,
                priority,
                expiresAt,
                completed,
            }
        })
        
        if(projectId) await prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                project: {
                    connect: {
                        id: projectId
                    }
                }
            }
        })

        return NextResponse.json({
            message: "Task aggiornato con successo",
            data: updatedTask.id
        })

    } catch (error) {
        if(process.env.NODE_ENV !== "production") console.log("updateTask", error);
        return new NextResponse("Si è verificato un errore, riprova", {status: 500});
    }
}

export async function DELETE(request: Request, { params }: { params: IParams }){
    try {

        const {taskId} = params;

        const loggedUser = await getLoggedUser();

        if(!loggedUser) return new NextResponse("Operazione non consentita", {status: 500});

        const deletedTask = await prisma.task.delete({
            where: {
                id: taskId
            }
        })

        return NextResponse.json({
            message: "Task eliminato con successo",
            data: deletedTask.id
        })

    } catch (error) {
        if(process.env.NODE_ENV !== "production") console.log("deleteTask", error);
        return new NextResponse("Si è verificato un errore, riprova", {status: 500});
    }
}

