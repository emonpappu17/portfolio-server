"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutSchema = void 0;
const zod_1 = require("zod");
// Education schema
const educationSchema = zod_1.z.object({
    degree: zod_1.z.string(),
    institution: zod_1.z.string(),
    startYear: zod_1.z.number().optional(),
    endYear: zod_1.z.number().nullable().optional(),
    gpa: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
});
// Experience schema
const experienceSchema = zod_1.z.object({
    title: zod_1.z.string(),
    organization: zod_1.z.string(),
    startYear: zod_1.z.number().optional(),
    endYear: zod_1.z.number().nullable().optional(),
    description: zod_1.z.string().optional(),
});
// Main About schema
exports.aboutSchema = zod_1.z.object({
    fullName: zod_1.z.string(),
    title: zod_1.z.string(),
    bio: zod_1.z.string(),
    image: zod_1.z.string().url(),
    skills: zod_1.z.array(zod_1.z.string()),
    whatILove: zod_1.z.string().nullable().optional(),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string(),
    location: zod_1.z.string(),
    github: zod_1.z.string().url(),
    linkedin: zod_1.z.string().url(),
    education: zod_1.z.array(educationSchema),
    experiences: zod_1.z.array(experienceSchema),
});
