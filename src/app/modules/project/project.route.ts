import { Router } from "express";
// import { BlogController } from "./blog.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
// import { blogSchema } from "./blog.validation";

const router = Router();

router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getSingleProject);


// router.delete("/:id", checkAuth("ADMIN"), ProjectController.deleteBlog);
// router.patch("/:slug", checkAuth("ADMIN"), ProjectController.updateBlog);
// router.post("/", checkAuth("ADMIN"), validateRequest(blogSchema), ProjectController.createBlog);


export const ProjectRoutes = router