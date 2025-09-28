interface EnvConfig {
    PORT: string,
    DATABASE_URL: string,
    BCRYPT_SALT_ROUND: string,
    JWT_ACCESS_SECRET: string,
    JWT_ACCESS_EXPIRES: string,
    ADMIN_EMAIL: string,
    ADMIN_PASSWORD: string,
    ADMIN_NAME: string
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables: string[] = ["PORT", "DATABASE_URL", "BCRYPT_SALT_ROUND", "JWT_ACCESS_SECRET", "JWT_ACCESS_EXPIRES", "ADMIN_EMAIL", "ADMIN_PASSWORD", "ADMIN_NAME"];

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require env variable ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        DATABASE_URL: process.env.DATABASE_URL as string,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
        ADMIN_PASSWORD: process.env.ADMIN_EMAIL as string,
        ADMIN_NAME: process.env.ADMIN_NAME as string
    }
}

export const envVars = loadEnvVariables();