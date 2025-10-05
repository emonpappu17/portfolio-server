import { Project } from "@prisma/client";
import { prisma } from "../../config/db";

// Owner
const createProject = async (payload: Project): Promise<Project | null> => {
    const result = await prisma.project.create({
        data: payload
    });
    return result
}

const updateProject = async (id: string, payload: Project): Promise<Project | null> => {
    const result = await prisma.project.create({
        data: payload
    });
    return result
}

const deleteProject = async (id: string): Promise<Project | null> => {
    const result = await prisma.project.delete({
        where: { id }
    });
    return result
}

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
    getSingleProject,
    createProject,
    updateProject,
    deleteProject
}