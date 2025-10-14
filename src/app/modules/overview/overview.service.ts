import { prisma } from "../../config/db"

const getOverview = async () => {
    const [totalBlogs, totalProjects, totalViews, recentBlogs, recentProjects, about] =
        await Promise.all([
            prisma.blog.count(),
            prisma.project.count(),
            prisma.blog.aggregate({
                _sum: { views: true },
            }),
            prisma.blog.findMany({
                orderBy: { createdAt: "desc" },
                take: 3,
                select: {
                    id: true,
                    title: true,
                    thumbnail: true,
                    createdAt: true,
                    slug: true,
                },
            }),
            prisma.project.findMany({
                orderBy: { createdAt: "desc" },
                take: 3,
                select: {
                    id: true,
                    title: true,
                    thumbnail: true,
                    live_link: true,
                    createdAt: true,
                },
            }),
            prisma.about.findUnique({
                where: { id: "SINGLETON_ID" },
                select: {
                    fullName: true,
                    title: true,
                    image: true,
                    bio: true,
                },
            }),
        ]);

    return {
        totalBlogs,
        totalProjects,
        totalViews: totalViews._sum.views || 0,
        recentBlogs,
        recentProjects,
        about,
    };
}

export const OverviewService = {
    getOverview
}