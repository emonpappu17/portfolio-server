"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const blog_route_1 = require("../modules/blog/blog.route");
const project_route_1 = require("../modules/project/project.route");
const about_route_1 = require("../modules/about/about.route");
const overview_routes_1 = require("../modules/overview/overview.routes");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes
    },
    {
        path: "/user",
        route: user_route_1.UserRoutes
    },
    {
        path: "/blog",
        route: blog_route_1.BlogRoutes
    },
    {
        path: "/project",
        route: project_route_1.ProjectRoutes
    },
    {
        path: "/about",
        route: about_route_1.AboutRoutes
    },
    {
        path: "/overview",
        route: overview_routes_1.OverviewRoutes
    }
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
