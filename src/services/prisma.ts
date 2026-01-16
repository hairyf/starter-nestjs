import process from 'node:process'
import { proxy } from '@hairy/utils'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '@prisma/client'

export const prisma = proxy<PrismaClient>()

if (process.env.DATABASE_URL) {
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5,
  })
  prisma.proxy.update(new PrismaClient({ adapter }))
}

export const isPrismaAvailable = prisma.proxy.original() !== undefined
