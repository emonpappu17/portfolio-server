import { prisma } from "../../config/db"

const getMe = async (id: string) => {

    const user = await prisma.user.findUnique({
        where: {
            id
        },
        // omit: {
        //     password
        // }
    })
    return user
}

export const UserService = {
    getMe
}
