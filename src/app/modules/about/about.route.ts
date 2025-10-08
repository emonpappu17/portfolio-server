import { Router } from "express";
import { AboutController } from "./about.controller";

const router = Router();

router.get("/", AboutController.getAbout)
router.patch("/", AboutController.upsertAbout)

export const AboutRoutes = router;