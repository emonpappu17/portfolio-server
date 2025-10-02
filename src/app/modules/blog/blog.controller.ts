import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes';
import { BlogService } from "./blog.service";

const createBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const result = await BlogService.createBlog(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Blog createBlogd successfully",
        data: result
    })
})


export const BlogController = {
    createBlog
}