import {NextResponse} from "next/server";
import {getLoggedUser} from "@/app/actions/users";
import prisma from "@/app/libs/prismadb";

export async function PATCH(request: Request) {
    try {

        const body = await request.json();

        const {name, email} = body;

        if(!name || !email) return new NextResponse("Assicurati di aver compilato tutti i campi richiesti", {status: 500});

        const loggedUser = await getLoggedUser();

        if(!loggedUser) return new NextResponse("Operazione non consentita", {status: 500});

        const updatedProfile = await prisma.user.update({
            where: {
                id: loggedUser.id
            },
            data: {
                name,
                email,
            }
        })

        return NextResponse.json({
            message: "Dati profilo aggiornati correttamente",
            user: updatedProfile
        })

    } catch (error) {
        if(process.env.NODE_ENV !== "production") console.log("updateProfile", error);
        return new NextResponse("Si è verificato un errore, riprova", {status: 500})
    }
}