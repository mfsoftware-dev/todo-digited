import {NextResponse} from "next/server";
import {getLoggedUser} from "@/app/actions/users";
import prisma from "@/app/libs/prismadb";
import {startOfDay} from "date-fns";

export async function GET() {
    try {
        
        const loggedUser = await getLoggedUser();
        
        if(!loggedUser) return new NextResponse("Operazione non consentita", {status: 500})
        
        const items = await prisma.task.findMany({
            where: {
                userId: loggedUser.id,
                createdAt: {
                    lt: startOfDay(new Date())
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        
        return NextResponse.json({
            items
        })
    } catch (error) {
        if(process.env.NODE_ENV !== "production") console.log("getOldTaskList", error);
        return new NextResponse("Si è verificato un errore, riprova", {status: 500})
    }
}