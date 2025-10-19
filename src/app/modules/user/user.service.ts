import { prisma } from "../../config/db"
import AppError from "../../errorHelpers/AppError"

const getMe = async (id: string) => {

    const user = await prisma.user.findUnique({
        where: {
            id
        },
        // omit: {
        //     password
        // }
    })
    // return user

    if (!user) throw new AppError(404, "user not found")

    // remove password 
    const { password, ...safeUser } = user
    return safeUser
}

export const UserService = {
    getMe
}
