import {NextResponse} from "next/server";
import {getLoggedUser} from "@/app/actions/users";
import prisma from "@/app/libs/prismadb";

interface IParams {
    projectId?: string
}

export async function PATCH(request: Request, { params }: { params: IParams }){
    try {

        const body = await request.json();

        const {name, description} = body;
        const {projectId} = params;

        if(!name || !description) return new NextResponse("Assicurati di aver compilato tutti i campi richiesti", {status: 500});

        const loggedUser = await getLoggedUser();

        if(!loggedUser) return new NextResponse("Operazione non consentita", {status: 500});

        const updatedProject = await prisma.project.update({
            where: {
                id: projectId
            },
            data: {
                name,
                description,
            }
        })

        return NextResponse.json({
            message: "Progetto aggiornato con successo",
            data: updatedProject.id
        })

    } catch (error) {
        if(process.env.NODE_ENV !== "production") console.log("updateProject", error);
        return new NextResponse("Si è verificato un errore, riprova", {status: 500});
    }
}

export async function DELETE(request: Request, { params }: { params: IParams }){
    try {

        const {projectId} = params;

        const loggedUser = await getLoggedUser();

        if(!loggedUser) return new NextResponse("Operazione non consentita", {status: 500});

        const deletedProject = await prisma.project.delete({
            where: {
                id: projectId
            }
        })

        return NextResponse.json({
            message: "Progetto eliminato con successo",
            data: deletedProject.id
        })

    } catch (error) {
        if(process.env.NODE_ENV !== "production") console.log("deleteProject", error);
        return new NextResponse("Si è verificato un errore, riprova", {status: 500});
    }
}

