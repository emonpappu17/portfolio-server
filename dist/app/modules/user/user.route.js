"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.get('/me', (0, checkAuth_1.checkAuth)("ADMIN"), user_controller_1.UserController.getMe);
exports.UserRoutes = router;
