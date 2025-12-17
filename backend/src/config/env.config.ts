import { registerAs } from '@nestjs/config';

export default registerAs('env', () => ({
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 4000,
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
}));
