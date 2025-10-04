import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes';
import { BlogService } from "./blog.service";

const getAllBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const search = (req.query.search as string) || '';
    const tags = req.query.tags ? (req.query.tags as string).split(",") : []

    // console.log(tags);

    // console.log('getAllBlog hit');

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
        message: "Blog created successfully",
        data: result
    })
})

const getBySlug = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // console.log('sjkhsjkdfh');

    const result = await BlogService.getBySlug(req.params.slug);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Blog got successfully",
        data: result
    })
})

const deleteBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // console.log('sjkhsjkdfh');

    const result = await BlogService.deleteBlog(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Blog deleted successfully",
        data: result
    })
})


export const BlogController = {
    createBlog,
    getAllBlog,
    getBySlug,
    deleteBlog
}