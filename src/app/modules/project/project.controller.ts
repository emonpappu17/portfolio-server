import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { ProjectService } from "./project.service";
import { de } from "zod/v4/locales";



// Owner
const createProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await ProjectService.createProject(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Project created successfully",
        data: result
    })
})

const updateProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await ProjectService.updateProject(req.params.id, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Project updated successfully",
        data: result
    })
})

const deleteProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await ProjectService.deleteProject(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Project deleted successfully",
        data: result
    })
})

// Public
const getAllProjects = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await ProjectService.getAllProjects();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All projects got successfully",
        data: result
    })
})

const getSingleProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await ProjectService.getSingleProject(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Project got successfully",
        data: result
    })
})



export const ProjectController = {
    getAllProjects,
    getSingleProject,
    createProject,
    updateProject,
    deleteProject
}