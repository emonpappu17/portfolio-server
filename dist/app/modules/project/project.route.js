"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = require("express");
const project_controller_1 = require("./project.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const router = (0, express_1.Router)();
//public
router.get("/", project_controller_1.ProjectController.getAllProjects);
router.get("/:id", project_controller_1.ProjectController.getSingleProject);
//owner 
router.post("/", (0, checkAuth_1.checkAuth)("ADMIN"), project_controller_1.ProjectController.createProject);
router.patch("/:id", (0, checkAuth_1.checkAuth)("ADMIN"), project_controller_1.ProjectController.updateProject);
router.delete("/:id", (0, checkAuth_1.checkAuth)("ADMIN"), project_controller_1.ProjectController.deleteProject);
exports.ProjectRoutes = router;
