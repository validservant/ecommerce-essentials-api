import dotenv from "dotenv";
dotenv.config();

function getEnvVariable(key: string): string {
    const value = process.env[key];

    if (!value){
        throw new Error(`❌ Missing environment variable: ${key}`);
    }
    return value;
}

export const env = {
    PORT: Number(process.env.PORT) || 3001
};