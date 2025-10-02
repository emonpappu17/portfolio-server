import { Blog, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes"

const getAllBlog = async ({
    page = 1,
    limit = 10,
    search,
    // isFeatured,
    tags
}: {
    page?: number,
    limit?: number,
    search?: string,
    // isFeatured?: boolean,
    tags?: string[]
}) => {
    const skip = (page - 1) * limit;
    // console.log(search);
    // console.log({ isFeatured });
    console.log(tags);

    const where: any = {
        AND: [
            search && {
                OR: [
                    {
                        title: {
                            contains: search,
                            mode: "insensitive"
                        },
                    },
                    // {
                    //     content: {
                    //         contains: search,
                    //         mode: "insensitive"
                    //     }
                    // }
                ]
            },
            // typeof isFeatured === 'boolean' && { isFeatured },
            (tags && tags.length > 0) && { tags: { hasEvery: tags } }
        ].filter(Boolean)
    };

    const result = await prisma.blog.findMany({
        skip,
        take: limit,
        where,
        include: {
            author: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const total = await prisma.blog.count({ where });

    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
}


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
    createBlog,
    getAllBlog
}