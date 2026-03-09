---
name: best-practices-bigint-serialization
description: Fixing JSON serialization for BigInt and Prisma Decimal types
---

# BigInt and Decimal Serialization

## Usage

This project uses `withDecimalRepair(app)` from `nestjs-extras-w` in `main.ts`. It overrides `toJSON` for `BigInt` and Prisma `Decimal` so API responses serialize correctly.

```typescript
import { withDecimalRepair } from 'nestjs-extras-w'

async function main() {
  const app = await NestFactory.create(AppModule)
  withDecimalRepair(app)
  // ...
}
```

## Why This Is Needed

* **BigInt**: JavaScript's `BigInt` type cannot be serialized to JSON by default (`TypeError: Do not know how to serialize a BigInt`)
* **Prisma Decimal**: Prisma's `Decimal` type uses a custom internal representation that doesn't serialize well
* **API Responses**: NestJS automatically calls `JSON.stringify()` on response objects, which fails without these overrides

## Implementation Details

* **Decimal Conversion**: Uses `toHex()` to get the internal representation, then converts via `BigNumber` to a string
* **BigInt Conversion**: Converts to string using `String()` constructor
* **Prototype Modification**: Modifies prototypes globally; apply once at startup via `withDecimalRepair(app)` from nestjs-extras-w
* **ESLint Exception**: Use `/* eslint-disable no-extend-native */` to suppress linting warnings

## Key Points

* **Apply Early**: Call this function before any routes are registered
* **Global Effect**: Modifies prototypes, affecting all instances in the application
* **Decimal Precision**: `BigNumber` preserves precision better than simple `toString()`
* **String Output**: Both types serialize to strings in JSON, which is safe for API responses
