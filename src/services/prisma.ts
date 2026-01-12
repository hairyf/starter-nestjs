import process from 'node:process'
import { proxy } from '@hairy/utils'
import { PrismaClient } from '@prisma/client'

export const prisma = proxy<PrismaClient>()

if (process.env.DATABASE_URL)
  prisma.proxy.update(new PrismaClient({ accelerateUrl: process.env.DATABASE_URL }))

export const isPrismaAvailable = prisma.proxy.original() !== undefined
