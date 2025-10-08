import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AboutService } from "./about.service";

const upsertAbout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await AboutService.upsertAbout(req.body);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "About upsert Successfully",
        data: result
    })
})

const getAbout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await AboutService.getAbout();

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "About got Successfully",
        data: result
    })
})

export const AboutController = {
    upsertAbout,
    getAbout
}