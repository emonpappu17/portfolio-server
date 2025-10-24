"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const db_1 = require("../../config/db");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getAllBlog = (_a) => __awaiter(void 0, [_a], void 0, function* ({ page = 1, limit = 20, search, 
// isFeatured,
tags }) {
    const skip = (page - 1) * limit;
    // console.log(search);
    // console.log({ isFeatured });
    // console.log(tags);
    const where = {
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
    const result = yield db_1.prisma.blog.findMany({
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
    const total = yield db_1.prisma.blog.count({ where });
    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
});
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingBlog = yield db_1.prisma.blog.findUnique({
        where: {
            title: payload.title
        }
    });
    if (existingBlog)
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Blog title is already exist");
    // creating slug
    const baseSlug = payload.title.toLocaleLowerCase().split(" ").join("-");
    let slug = `${baseSlug}`;
    let counter = 0;
    while (yield db_1.prisma.blog.findUnique({
        where: {
            slug: slug
        }
    })) {
        slug = `${slug}-${counter++}`;
    }
    payload.slug = slug;
    const result = yield db_1.prisma.blog.create({
        data: payload,
    });
    return result;
});
const getBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.$transaction((tran) => __awaiter(void 0, void 0, void 0, function* () {
        yield tran.blog.update({
            where: { slug: slug },
            data: {
                views: {
                    increment: 1
                }
            }
        });
        return yield tran.blog.findUnique({
            where: { slug: slug },
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            },
        });
    }));
    return result;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield db_1.prisma.blog.findUnique({
        where: {
            id: id
        }
    });
    if (!blog)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Blog not found");
    const result = yield db_1.prisma.blog.delete({
        where: {
            id: id
        }
    });
    return { id: result.id };
});
const updateBlog = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield db_1.prisma.blog.findUnique({
        where: {
            slug: slug
        }
    });
    if (!blog)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Blog not found");
    const baseSlug = payload.title.toLocaleLowerCase().split(" ").join("-");
    payload.slug = `${baseSlug}`;
    const result = yield db_1.prisma.blog.update({
        where: {
            slug: slug
        },
        data: payload
    });
    return result;
});
exports.BlogService = {
    createBlog,
    getAllBlog,
    getBySlug,
    deleteBlog,
    updateBlog
};
