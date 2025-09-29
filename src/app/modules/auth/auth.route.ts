import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { loginSchema } from "./auth.validation";

const router = Router();

router.post('/login', validateRequest(loginSchema), AuthController.login);

router.post(
    "/logout",
    AuthController.logout
)

export const AuthRoutes = router;