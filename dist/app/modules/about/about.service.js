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
exports.AboutService = void 0;
const db_1 = require("../../config/db");
const upsertAbout = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.about.upsert({
        where: {
            id: "SINGLETON_ID"
        },
        create: Object.assign({ id: "SINGLETON_ID" }, payload),
        update: Object.assign({}, payload),
    });
});
const getAbout = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.about.findUnique({
        where: { id: "SINGLETON_ID" }
    });
});
exports.AboutService = {
    upsertAbout,
    getAbout
};
