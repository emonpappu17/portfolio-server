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
exports.seedAdmin = void 0;
const db_1 = require("../config/db");
const env_1 = require("../config/env");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const password = env_1.envVars.ADMIN_PASSWORD;
        // console.log('password a==>',password);
        const hash = yield bcryptjs_1.default.hash(password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
        const existing = yield db_1.prisma.user.findUnique({
            where: {
                email: env_1.envVars.ADMIN_EMAIL
            }
        });
        if (!existing) {
            yield db_1.prisma.user.create({
                data: {
                    email: env_1.envVars.ADMIN_EMAIL,
                    password: hash,
                    name: env_1.envVars.ADMIN_NAME,
                    image: 'https://github.com/shadcn.png'
                }
            });
            console.log("Admin user seeded ✅");
        }
        else {
            console.log("Admin already exists.");
        }
    }
    catch (error) {
        console.log('Error to make admin:', error);
    }
});
exports.seedAdmin = seedAdmin;
