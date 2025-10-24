"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverviewRoutes = void 0;
const express_1 = require("express");
const overview_controller_1 = require("./overview.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const router = (0, express_1.Router)();
router.get("/", (0, checkAuth_1.checkAuth)("ADMIN"), overview_controller_1.OverviewController.getOverview);
exports.OverviewRoutes = router;
