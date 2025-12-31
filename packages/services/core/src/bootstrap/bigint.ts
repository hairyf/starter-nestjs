/* eslint-disable no-extend-native */
import type { INestApplication } from '@nestjs/common'
import { Decimal } from '@prisma/client/runtime/library'
import BigNumber from 'bignumber.js'

export function withNestjsBigintRepair(_app: INestApplication, decimal = Decimal) {
  Object.defineProperty(decimal.prototype, 'toString', {
    get() { return () => new BigNumber(this.toHex()).toFixed() },
  })
  Object.defineProperty(decimal.prototype, 'toJSON', {
    get() { return () => new BigNumber(this.toHex()).toFixed() },
  })

  Object.defineProperty(BigInt.prototype, 'toJSON', {
    get() { return () => String(this) },
  })
}
