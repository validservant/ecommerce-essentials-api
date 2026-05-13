import "dotenv/config";

function getEnvVariable(key: string): string {
    const value = process.env[key];

    if (!value){
        throw new Error(`❌ Missing environment variable: ${key}`);
    }
    return value;
}

export const env = {
    PORT: Number(process.env.PORT) || 3001,
    DB_NAME:getEnvVariable("DB_NAME"),
    DB_USER:getEnvVariable("DB_USER"),
    DB_PWD:getEnvVariable("DB_PWD"),
    DB_HOST:getEnvVariable("DB_HOST"),
    DB_DIALCT:getEnvVariable("DB_DIALCT"),
};