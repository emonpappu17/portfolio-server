"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutRoutes = void 0;
const express_1 = require("express");
const about_controller_1 = require("./about.controller");
const router = (0, express_1.Router)();
router.get("/", about_controller_1.AboutController.getAbout);
router.patch("/", about_controller_1.AboutController.upsertAbout);
exports.AboutRoutes = router;
