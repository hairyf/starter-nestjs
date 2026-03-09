---
name: core-service-proxy
description: Optional service pattern using ghost from @hairy/utils for conditional service availability
---

# Service Ghost Pattern

## Usage

Use the `ghost` utility from `@hairy/utils` to create services that are conditionally available. Until resolved, access throws with your custom message; after `resolve(instance)`, the ghost forwards to the real instance.

```typescript
import process from 'node:process'
import { ghost } from '@hairy/utils'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

export const prisma = ghost<PrismaClient>('Prisma is not available, please check your environment variables.')

if (process.env.DATABASE_URL) {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  prisma.resolve(new PrismaClient({ adapter }))
}
```

## Service Initialization

Check environment variables and call `resolve(instance)` when the service is configured:

```typescript
import type { RedisOptions } from 'ioredis'
import process from 'node:process'
import { ghost } from '@hairy/utils'
import { Redis } from 'ioredis'

export const redis = ghost<Redis>('Redis is not available, please check your environment variables.')

if (process.env.REDIS_HOST && process.env.REDIS_PORT) {
  const options: RedisOptions = {
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT!),
  }
  redis.resolve(new Redis(options))
}
else if (process.env.REDIS_URL) {
  redis.resolve(new Redis(process.env.REDIS_URL!))
}
```

## Using in Modules

Use the `enabled` flag to conditionally import modules that depend on the service:

```typescript
import { redis } from './services'
import { IoredisAdapter, RedlockModule } from 'nestjs-redlock-universal'

const imports = [
  redis.enabled && RedlockModule.forRoot({
    nodes: [new IoredisAdapter(redis)],
    defaultTtl: 30000,
  }),
]

@Module({
  imports: imports.filter(Boolean) as DynamicModule[],
})
export class AppModule {}
```

## Key Points

* **ghost&lt;T&gt;(message)**: Creates a ghost proxy; unbound access throws with `message`
* **resolve(instance)**: Binds the real instance; afterwards the ghost delegates to it and `enabled` is true
* **enabled**: Read-only flag; use for conditional module imports (e.g. `redis.enabled && RedlockModule.forRoot(...)`)
* **Type Safety**: The ghost preserves the TypeScript type of the wrapped service
* **Multiple Config Sources**: Support both `REDIS_HOST`/`REDIS_PORT` and `REDIS_URL` (or `DATABASE_URL` for Prisma)
