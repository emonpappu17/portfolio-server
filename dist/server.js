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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./app/config/db");
const app_1 = __importDefault(require("./app"));
const seedAdmin_1 = require("./app/utils/seedAdmin");
let server;
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.prisma.$connect();
        console.log("✅ DB Connected Successfully!");
    }
    catch (error) {
        console.error("❌ Error connecting to DB:", error);
        process.exit(1);
    }
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectToDB();
        server = app_1.default.listen(process.env.PORT, () => {
            console.log(`🚀 Server is running on port ${process.env.PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Error occurred starting server:", error);
        process.exit(1);
    }
});
/**
 * Graceful Shutdown Handler
 */
const gracefulShutdown = (reason, error) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield db_1.prisma.$disconnect();
        console.log("🔌 Prisma disconnected.");
    }
    catch (err) {
        console.error("Error disconnecting Prisma:", err);
    }
    process.exit(1);
});
// Start app
// startServer();
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield startServer();
    yield (0, seedAdmin_1.seedAdmin)();
}))();
// Register shutdown signals
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("unhandledRejection", (err) => gracefulShutdown("Unhandled Rejection", err));
process.on("uncaughtException", (err) => gracefulShutdown("Uncaught Exception", err));
