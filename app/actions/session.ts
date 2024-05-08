import { getServerSession } from "next-auth";
import {authOptions} from "@/app/libs/auth";

export default async function getCurrentSession() {
    return await getServerSession(authOptions);
}