import process from 'node:process'
import { ghost } from '@hairy/utils'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

export const prisma = ghost<PrismaClient>('Prisma is not available, please check your environment variables.')

if (process.env.DATABASE_URL) {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  prisma.resolve(new PrismaClient({ adapter }))
}
