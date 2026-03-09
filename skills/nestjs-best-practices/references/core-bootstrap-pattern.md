---
name: core-bootstrap-pattern
description: Application setup via nestjs-extras-w package
---

# Application Setup (nestjs-extras-w)

## Usage

Use the `nestjs-extras-w` package for functional application configuration. It provides `with*` and `start*` helpers so `main.ts` stays minimal and setup is modular.

```typescript
import { NestFactory } from '@nestjs/core'
import {
  startNestjsListen,
  withDecimalRepair,
  withNestjsCors,
  withNestjsSwagger,
} from 'nestjs-extras-w'

import { AppModule } from './app.module'

async function main() {
  const app = await NestFactory.create(AppModule)

  withDecimalRepair(app)
  withNestjsSwagger(app, config => config
    .setTitle('Website')
    .setDescription('The website API')
    .setVersion('1.0'))
  withNestjsCors(app)
  startNestjsListen(app)
}

main()
```

## Provided Helpers

| Helper | Purpose |
|--------|---------|
| `withDecimalRepair(app)` | BigInt/Prisma Decimal JSON serialization fix |
| `withNestjsSwagger(app, setup?)` | Swagger/OpenAPI with optional config callback |
| `withNestjsCors(app)` | CORS configuration |
| `startNestjsListen(app)` | Listen with optional port / auto-increment on EADDRINUSE |

## Key Points

* **Single Dependency**: Application bootstrap logic lives in `nestjs-extras-w`, not local bootstrap files
* **Composability**: Call helpers in any order in `main.ts`
* **Optional Configuration**: e.g. `withNestjsSwagger` accepts a callback for title, version, tags, etc.
* **Consistent Naming**: `with*` for configuration, `start*` for starting the server
