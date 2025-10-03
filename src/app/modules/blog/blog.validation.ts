import { z } from "zod";

export const blogSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    content: z.string().min(50, "Content must be at least 50 characters"), // assumes HTML is already in string
    thumbnail: z.string(),
    tags: z.array(z.string()).min(1, "At least 1 tag is required"),
    authorId: z.string().min(1, "AuthorId is required"),
});

// export type CreateBlogInput = z.infer<typeof blogSchema>;
