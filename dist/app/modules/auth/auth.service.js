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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const db_1 = require("../../config/db");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../../utils/jwt");
const env_1 = require("../../config/env");
const login = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    const user = yield db_1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Admin not found");
    }
    const isPasswordMatched = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Incorrect password");
    }
    const jwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role
    };
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.JWT_ACCESS_SECRET, env_1.envVars.JWT_ACCESS_EXPIRES);
    // Exclude password
    const { password: _ } = user, safeUser = __rest(user, ["password"]);
    return {
        user: safeUser,
        accessToken: accessToken
    };
});
exports.AuthService = {
    login
};
