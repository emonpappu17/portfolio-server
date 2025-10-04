import { Router } from "express";
import { BlogController } from "./blog.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { blogSchema } from "./blog.validation";

const router = Router();

router.get("/", BlogController.getAllBlog);
router.get("/:slug", BlogController.getBySlug);
router.delete("/:id", checkAuth("ADMIN"), BlogController.deleteBlog);
router.patch("/:slug", checkAuth("ADMIN"), BlogController.updateBlog);
router.post("/", checkAuth("ADMIN"), validateRequest(blogSchema), BlogController.createBlog);


export const BlogRoutes = router