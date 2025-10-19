import { Project } from "@prisma/client";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";

// Owner
const createProject = async (payload: Project): Promise<Project | null> => {
    const result = await prisma.project.create({
        data: payload
    });
    return result
}

const updateProject = async (id: string, payload: Project): Promise<Project | null> => {
    const result = await prisma.project.update({
        where: {
            id
        },
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
            createdAt: "asc"
        }
    });
    return result
}

const getSingleProject = async (id: string): Promise<Project | null> => {
    // console.log('id from service', id);
    const result = await prisma.project.findUnique({
        where: { id }
    })
    if (!result) throw new AppError(404, "Project not found")

    return result;
}

export const ProjectService = {
    getAllProjects,
    getSingleProject,
    createProject,
    updateProject,
    deleteProject
}