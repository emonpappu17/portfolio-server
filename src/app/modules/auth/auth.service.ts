import bcryptjs from 'bcryptjs';
import httpStatus from "http-status-codes";
import { prisma } from "../../config/db";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { generateToken } from "../../utils/jwt";

const login = async ({ email, password }: { email: string, password: string }) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Owner not found");
    }

    const isPasswordMatched = await bcryptjs.compare(password as string, user.password as string)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password");
    }

    const jwtPayload = {
        id: user.id,
        email: user.email,
        // role: user.role
    }

    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

    // Exclude password
    const { password: _, ...safeUser } = user;

    return {
        user: safeUser,
        accessToken: accessToken
    };
};

export const AuthService = {
    login
}