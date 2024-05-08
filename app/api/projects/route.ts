import {NextResponse} from "next/server";
import {getLoggedUser} from "@/app/actions/users";
import prisma from "@/app/libs/prismadb";

export async function GET(request: Request) {
    try {
        
        const loggedUser = await getLoggedUser();
        
        if(!loggedUser) return new NextResponse("Operazione non consentita", {status: 500})
        
        const items = await prisma.project.findMany({
            where: {
                userId: loggedUser.id
            },
            include: {
                tasks: true
            }
        })
        
        return NextResponse.json({
            items
        })
    } catch (error) {
        if(process.env.NODE_ENV !== "production") console.log("getProjectList", error);
        return new NextResponse("Si è verificato un errore, riprova", {status: 500})
    }
}

export async function POST(request: Request) {
    try {

        const body = await request.json();

        const {name, description} = body;

        if(!name || !description) return new NextResponse("Assicurati di aver compilato tutti i campi richiesti", {status: 500});

        const loggedUser = await getLoggedUser();

        if(!loggedUser) return new NextResponse("Operazione non consentita", {status: 500});

        const createdProject = await prisma.project.create({
            data: {
                name,
                description,
            }
        })

        return NextResponse.json({
            message: "Progetto registrato correttamente",
            data: createdProject.id
        })

    } catch (error) {
        if(process.env.NODE_ENV !== "production") console.log("insertNewProject", error);
        return new NextResponse("Si è verificato un errore, riprova", {status: 500})
    }
}