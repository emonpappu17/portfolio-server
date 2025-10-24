"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverviewService = void 0;
const db_1 = require("../../config/db");
const getOverview = () => __awaiter(void 0, void 0, void 0, function* () {
    const [totalBlogs, totalProjects, totalViews, recentBlogs, recentProjects] = yield Promise.all([
        db_1.prisma.blog.count(),
        db_1.prisma.project.count(),
        db_1.prisma.blog.aggregate({
            _sum: { views: true },
        }),
        db_1.prisma.blog.findMany({
            orderBy: { createdAt: "desc" },
            take: 4,
            select: {
                id: true,
                title: true,
                thumbnail: true,
                createdAt: true,
                slug: true,
            },
        }),
        db_1.prisma.project.findMany({
            orderBy: { createdAt: "desc" },
            take: 4,
            select: {
                id: true,
                title: true,
                thumbnail: true,
                live_link: true,
                createdAt: true,
            },
        }),
    ]);
    return {
        totalBlogs,
        totalProjects,
        totalViews: totalViews._sum.views || 0,
        recentBlogs,
        recentProjects,
        // about,
    };
});
exports.OverviewService = {
    getOverview
};
