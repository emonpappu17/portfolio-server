import { Router } from "express";
import { BlogController } from "./blog.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.get("/all", BlogController.getAllBlog);
router.get("/:slug", BlogController.getBySlug);


router.post("/create", checkAuth("ADMIN"), BlogController.createBlog);


export const BlogRoutes = router