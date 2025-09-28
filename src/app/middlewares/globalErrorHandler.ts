import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = err.message || 'Something went wrong!!'

    res.status(statusCode).json({
        success: false,
        message,
        // errorSources,
        err: err,
        stack: err.stack
    })
}