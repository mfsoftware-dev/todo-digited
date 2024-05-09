import {getLoggedUser} from "@/app/actions/users";
import {NextRequest, NextResponse} from "next/server";
import prisma from "@/app/libs/prismadb";
import {endOfDay} from "date-fns";

export async function POST(request: NextRequest) {
    try {
        
        const body = await request.json();
        const { name, priority, projectId } = body;

        const loggedUser = await getLoggedUser();

        if(!loggedUser) return new NextResponse("Operazione non consentita", {status: 500})

        const createdTask = await prisma.task.create({
            data: {
                name,
                priority,
                expiresAt: endOfDay(new Date()),
                user: {
                    connect: {
                        id: loggedUser.id
                    }
                }
            }
        })
        
        if(projectId) {
            await prisma.task.update({
                where: {
                    id: createdTask.id
                },
                data: {
                    project: {
                        connect: {
                            id: projectId
                        }
                    }
                }
            })
        }

        return NextResponse.json({
            message: "Task aggiunto con successo",
            data: createdTask.id
        })
    } catch (error) {
        if(process.env.NODE_ENV !== "production") console.log("createTask", error);
        return new NextResponse("Si è verificato un errore, riprova", {status: 500})
    }
}