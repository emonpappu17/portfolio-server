import { Project } from "@prisma/client";
import { prisma } from "../../config/db";

// Public
const getAllProjects = async (): Promise<Project[] | null> => {
    const result = await prisma.project.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    return result
}

const getSingleProject = async (id: string): Promise<Project | null> => {
    const result = await prisma.project.findUnique({
        where: { id }
    })
    return result;
}

export const ProjectService = {
    getAllProjects,
    getSingleProject
}