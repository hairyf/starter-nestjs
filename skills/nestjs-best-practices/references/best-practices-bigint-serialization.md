---
name: best-practices-bigint-serialization
description: Fixing JSON serialization for BigInt and Prisma Decimal types
---

# BigInt and Decimal Serialization

## Usage

Override `toJSON` methods for `BigInt` and Prisma `Decimal` types to ensure proper JSON serialization in API responses.

```typescript
import type { INestApplication } from '@nestjs/common'
import { Decimal } from '@prisma/client/runtime/client'
import BigNumber from 'bignumber.js'

export function withNestjsBigintRepair(_app: INestApplication) {
  Object.defineProperty(Decimal.prototype, 'toString', {
    get() { return () => new BigNumber(this.toHex()).toFixed() },
  })
  Object.defineProperty(Decimal.prototype, 'toJSON', {
    get() { return () => new BigNumber(this.toHex()).toFixed() },
  })

  Object.defineProperty(BigInt.prototype, 'toJSON', {
    get() { return () => String(this) },
  })
}
```

## Why This Is Needed

* **BigInt**: JavaScript's `BigInt` type cannot be serialized to JSON by default (`TypeError: Do not know how to serialize a BigInt`)
* **Prisma Decimal**: Prisma's `Decimal` type uses a custom internal representation that doesn't serialize well
* **API Responses**: NestJS automatically calls `JSON.stringify()` on response objects, which fails without these overrides

## Implementation Details

* **Decimal Conversion**: Uses `toHex()` to get the internal representation, then converts via `BigNumber` to a string
* **BigInt Conversion**: Converts to string using `String()` constructor
* **Prototype Modification**: Modifies prototypes globally, so apply once during bootstrap
* **ESLint Exception**: Use `/* eslint-disable no-extend-native */` to suppress linting warnings

## Key Points

* **Apply Early**: Call this function before any routes are registered
* **Global Effect**: Modifies prototypes, affecting all instances in the application
* **Decimal Precision**: `BigNumber` preserves precision better than simple `toString()`
* **String Output**: Both types serialize to strings in JSON, which is safe for API responses
