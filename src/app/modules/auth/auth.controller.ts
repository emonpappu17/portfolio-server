import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { AuthService } from "./auth.service";
import { setAuthCookie } from "../../utils/setAuthCookie";


const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthService.login(req.body);

    setAuthCookie(res, loginInfo);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Owner Logged In Successfully",
        data: {
            accessToken: loginInfo.accessToken,
            user: loginInfo.user
        }
    })
})

const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Owner Logged Out Successfully",
        data: null
    })
})


export const AuthController = {
    login,
    logout
}