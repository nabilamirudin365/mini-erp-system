import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

// Prisma v7 secara otomatis mengambil URL dari prisma.config.ts / .env
export const prisma = new PrismaClient();
