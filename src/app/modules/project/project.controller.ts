import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { ProjectService } from "./project.service";

const getAllProjects = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await ProjectService.getAllProjects();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All projects got successfully",
        data: result
    })
})



export const BlogController = {
    getAllProjects
}