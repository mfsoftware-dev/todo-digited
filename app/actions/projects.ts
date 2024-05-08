import prisma from "@/app/libs/prismadb";

export const fetchProjects = () => {
    try {
        return prisma.project.findMany({
            include: {
                tasks: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
    } catch (error) {
        if(process.env.NODE_ENV === 'development') console.log("fetchProjects", error);
        return undefined;
    }
}

export const fetchProjectById = (projectId: string) => {
    try {
        return prisma.project.findUnique({
            where: {
                id: projectId,
            },
            include: {
                tasks: true
            }
        })
    } catch (error) {
        if(process.env.NODE_ENV === 'development') console.log("fetchProjectById", error);
        return undefined;
    }
}