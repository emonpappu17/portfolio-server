import { Router } from "express";
import { BlogController } from "./blog.controller";

const router = Router();

router.post("/create", BlogController.createBlog)


export const BlogRoutes = router