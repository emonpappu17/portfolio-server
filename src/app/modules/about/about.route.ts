import { Router } from "express";
import { AboutController } from "./about.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { aboutSchema } from "./about.validation";

const router = Router();

router.get("/", AboutController.getAbout)
router.patch("/", validateRequest(aboutSchema), AboutController.upsertAbout)

export const AboutRoutes = router;