import { z } from "zod";

// Education schema
const educationSchema = z.object({
    degree: z.string(),
    institution: z.string(),
    startYear: z.number().optional(),
    endYear: z.number().nullable().optional(),
    gpa: z.string().optional(),
    description: z.string().optional(),
});

// Experience schema
const experienceSchema = z.object({
    title: z.string(),
    organization: z.string(),
    startYear: z.number().optional(),
    endYear: z.number().nullable().optional(),
    description: z.string().optional(),
});

// Main About schema
export const aboutSchema = z.object({
    fullName: z.string(),
    title: z.string(),
    bio: z.string(),
    image: z.string().url(),
    skills: z.array(z.string()),
    whatILove: z.string().nullable().optional(),
    email: z.string().email(),
    phone: z.string(),
    location: z.string(),
    github: z.string().url(),
    linkedin: z.string().url(),
    education: z.array(educationSchema),
    experiences: z.array(experienceSchema),
});

// TypeScript type inference
export type AboutInput = z.infer<typeof aboutSchema>;
