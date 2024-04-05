"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(amount: number, provider: string){
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if(!userId){
        return {
            msg: "user not logged in"
        }
    }
    const token = (Math.random() * 1000).toString();
    await prisma.onRampTransaction.create({
        data: {
            userId: Number(session?.user?.id),
            amount: amount*100, //*100 because we are not storing the decimals in the db
            status: "Processing",
            startTime: new Date(),
            provider: provider,
            token: token,
        }
    })
    return {
        msg: "on ramp transaction added"
    }
}