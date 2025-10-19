import { sendResponse } from "../../utils/sendResponse";
import { NextFunction, Request, Response } from "express";

import httpStatus from 'http-status-codes';
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { UserService } from "./user.service";

const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    // console.log('decodedToken==>', decodedToken);
    const result = await UserService.getMe(decodedToken.id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Your profile Retrieved Successfully",
        data: result,
    })
})

export const UserController = {
    getMe
}