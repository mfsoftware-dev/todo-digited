import {Project, Task} from "@prisma/client"

export type ProjectExt = Project & {
    tasks: Task[]
}