import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes"
import bcryptjs from 'bcryptjs';


// const login = async ({ email, password }: {
//     email: string, password: string
// }) => {
//     console.log({ email, password });

//     const user = await prisma.user.findUnique({
//         where: {
//             email
//         }
//     })

//     console.log('user 1==>', user);


//     if (!user) {
//         throw new AppError(httpStatus.NOT_FOUND, "Admin not Found!")
//     }

//     console.log(user.password);
//     console.log(password);

//     const isPasswordMatched = await bcryptjs.compare(password as string, user.password as string)

//     console.log('isPasswordMatched:', isPasswordMatched);

//     if (!isPasswordMatched) {
//         throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
//     }

//     console.log('user==>', user);

//     // const { password: pass, ...rest } = user.toObject();

//     return user;

// }

const login = async ({ email, password }: { email: string, password: string }) => {
    const user = await prisma.user.findUnique({ where: { email } });

    console.log('user==>', user);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    if (!user.password) {
        throw new AppError(httpStatus.BAD_REQUEST, "User has no password set");
    }

    // const isPasswordMatched = await bcryptjs.compare(password, user.password);

    const isPasswordMatched = await bcryptjs.compare(password as string, user.password as string)

    console.log('isPasswordMatched=>', isPasswordMatched);
    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password");
    }

    // Generate JWT token
    // const token = signToken({ id: user.id, role: user.role });

    // Exclude password
    const { password: _, ...safeUser } = user;

    return { user: safeUser };
};

export const AuthService = {
    login
}