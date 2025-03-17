/* eslint-disable no-extend-native */
import { PrismaClient } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import BigNumber from 'bignumber.js'

Object.defineProperty(Decimal.prototype, 'toString', {
  get() { return () => new BigNumber(this.toHex()).toFixed() },
})
Object.defineProperty(Decimal.prototype, 'toJSON', {
  get() { return () => new BigNumber(this.toHex()).toFixed() },
})
Object.defineProperty(BigInt.prototype, 'toJSON', {
  get() { return () => String(this) },
})

export const prisma = new PrismaClient()
