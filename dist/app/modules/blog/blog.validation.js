"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogSchema = void 0;
const zod_1 = require("zod");
exports.blogSchema = zod_1.z.object({
    title: zod_1.z.string().min(2, "Title must be at least 2 characters"),
    content: zod_1.z.string().min(50, "Content must be at least 50 characters"), // assumes HTML is already in string
    thumbnail: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()).min(1, "At least 1 tag is required"),
    authorId: zod_1.z.string().min(1, "AuthorId is required"),
});
// export type CreateBlogInput = z.infer<typeof blogSchema>;
