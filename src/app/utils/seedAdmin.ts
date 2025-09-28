import { prisma } from "../config/db";
import { envVars } from "../config/env"
import bcrypt from "bcryptjs";

export const seedAdmin = async () => {
    try {
        const password = envVars.ADMIN_PASSWORD;
        const hash = await bcrypt.hash(password, Number(envVars.BCRYPT_SALT_ROUND));

        const existing = await prisma.user.findUnique({
            where: {
                email: envVars.ADMIN_EMAIL
            }
        })

        if (!existing) {
            await prisma.user.create({
                data: {
                    email: envVars.ADMIN_EMAIL,
                    password: hash,
                    name: envVars.ADMIN_NAME,
                    image: 'https://github.com/shadcn.png'
                }
            })
            console.log("Admin user seeded ✅");
        } else {
            console.log("Admin already exists.");
        }
    } catch (error) {
        console.log('Error to make admin:', error);
    }
}