import { Router } from "express";
import { ProjectController } from "./project.controller";
import { checkAuth } from "../../middlewares/checkAuth";


const router = Router();

//public
router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getSingleProject);

//owner 
router.post("/", checkAuth(), ProjectController.createProject);
router.patch("/:id", checkAuth(), ProjectController.updateProject);
router.delete("/:id", checkAuth(), ProjectController.deleteProject);

export const ProjectRoutes = router;