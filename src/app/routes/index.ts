import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { BlogRoutes } from "../modules/blog/blog.route";
import { ProjectRoutes } from "../modules/project/project.route";
import { AboutRoutes } from "../modules/about/about.route";
import { OverviewRoutes } from "../modules/overview/overview.routes";

export const router = Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/blog",
        route: BlogRoutes
    },
    {
        path: "/project",
        route: ProjectRoutes
    },
    {
        path: "/about",
        route: AboutRoutes
    },
    {
        path: "/overview",
        route: OverviewRoutes
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})