import { Blog, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes"

const createBlog = async (payload: Prisma.BlogCreateInput): Promise<Blog> => {
    const existingBlog = await prisma.blog.findUnique({
        where: {
            title: payload.title
        }
    })

    if (existingBlog) throw new AppError(httpStatus.BAD_REQUEST, "Blog title is already exist")

    // creating slug
    const baseSlug = payload.title.toLocaleLowerCase().split(" ").join("-")
    let slug = `${baseSlug}`

    let counter = 0;
    while (await prisma.blog.findUnique(
        {
            where: {
                slug: slug
            }
        }
    )) {
        slug = `${slug}-${counter++}`
    }

    payload.slug = slug;

    const result = await prisma.blog.create({
        data: payload,
    })

    return result;
}

export const BlogService = {
    createBlog
}