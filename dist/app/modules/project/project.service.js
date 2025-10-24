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
exports.ProjectService = void 0;
const db_1 = require("../../config/db");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
// Owner
const createProject = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.project.create({
        data: payload
    });
    return result;
});
const updateProject = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.project.update({
        where: {
            id
        },
        data: payload
    });
    return result;
});
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.project.delete({
        where: { id }
    });
    return result;
});
// Public
const getAllProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.project.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    return result;
});
const getSingleProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('id from service', id);
    const result = yield db_1.prisma.project.findUnique({
        where: { id }
    });
    if (!result)
        throw new AppError_1.default(404, "Project not found");
    return result;
});
exports.ProjectService = {
    getAllProjects,
    getSingleProject,
    createProject,
    updateProject,
    deleteProject
};
