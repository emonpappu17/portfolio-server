import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes';
import { BlogService } from "./blog.service";

const getAllBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || '';
    const tags = req.query.tags ? (req.query.tags as string).split(",") : []

    console.log(tags);

    const result = await BlogService.getAllBlog({ page, limit, search, tags });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All blog got successfully",
        data: result
    })
})
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
    createBlog,
    getAllBlog
}