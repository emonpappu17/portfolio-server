import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { OverviewService } from "./overview.service";


const getOverview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await OverviewService.getOverview();


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Dashboard overview fetched successfully",
        data: result
    })
})

export const OverviewController = {
    getOverview
}
