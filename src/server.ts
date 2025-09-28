import { Server } from "http";
import { prisma } from "./app/config/db";
import app from "./app";
import { seedAdmin } from "./app/utils/seedAdmin";

let server: Server;

const connectToDB = async () => {
    try {
        await prisma.$connect();
        console.log("✅ DB Connected Successfully!");
    } catch (error) {
        console.error("❌ Error connecting to DB:", error);
        process.exit(1);
    }
};

const startServer = async () => {
    try {
        await connectToDB();

        server = app.listen(process.env.PORT, () => {
            console.log(`🚀 Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("❌ Error occurred starting server:", error);
        process.exit(1);
    }
};

/**
 * Graceful Shutdown Handler
 */
const gracefulShutdown = async (reason: string, error?: unknown) => {
    console.log(`⚠️  ${reason} detected. Starting graceful shutdown...`);

    if (error) {
        console.error(error);
    }

    // Close HTTP server
    if (server) {
        server.close(() => {
            console.log("🛑 HTTP server closed.");
        });
    }

    // Disconnect Prisma
    try {
        await prisma.$disconnect();
        console.log("🔌 Prisma disconnected.");
    } catch (err) {
        console.error("Error disconnecting Prisma:", err);
    }

    process.exit(1);
};

// Start app
// startServer();
(async () => {
    await startServer();
    await seedAdmin();
})()

// Register shutdown signals
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("unhandledRejection", (err) => gracefulShutdown("Unhandled Rejection", err));
process.on("uncaughtException", (err) => gracefulShutdown("Uncaught Exception", err));
