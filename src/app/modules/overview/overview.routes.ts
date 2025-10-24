import { Router } from "express";
import { OverviewController } from "./overview.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.get("/", checkAuth(), OverviewController.getOverview)

export const OverviewRoutes = router;