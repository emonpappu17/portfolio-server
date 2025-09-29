import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserController } from "./user.controller";

const router = Router();

router.get('/me', checkAuth("ADMIN"), UserController.getMe)

export const UserRoutes = router;