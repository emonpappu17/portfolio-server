import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from 'http-status-codes'
import AppError from "../errorHelpers/AppError";
import { prisma } from "../config/db";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log("req ===>",req.cookies);
        const accessToken = req.headers.authorization || req.cookies.accessToken;

        // console.log('accessToken==>', accessToken);

        if (!accessToken) throw new AppError(403, "No Token Received");

        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload;

        // console.log("verifiedToken=>", verifiedToken);


        const user = await prisma.user.findUnique({
            where: {
                email: verifiedToken.email
            }
        })

        // console.log(user);

        if (!user) {
            throw new AppError(httpStatus.BAD_REQUEST, "Admin doest not exist")
        }

        req.user = verifiedToken;

        next()
    } catch (error) {
        next(error)
    }
}