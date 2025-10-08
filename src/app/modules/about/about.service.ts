import { About, Prisma } from "@prisma/client"
import { prisma } from "../../config/db"

type AboutPayload = Omit<About, "id" | "createdAt" | "updatedAt">;

const upsertAbout = async (payload: AboutPayload) => {
    return prisma.about.upsert({
        where: {
            id: "SINGLETON_ID"
        },
        create: {
            id: "SINGLETON_ID", ...payload
        },
        update: {
            ...payload
        },

    })
}

const getAbout = async (): Promise<About | null> => {
    return prisma.about.findUnique({
        where: { id: "SINGLETON_ID" }
    })
}

export const AboutService = {
    upsertAbout,
    getAbout
}