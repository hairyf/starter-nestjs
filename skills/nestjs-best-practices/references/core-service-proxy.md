---
name: core-service-proxy
description: Optional service pattern using proxy utilities for conditional service availability
---

# Service Proxy Pattern

## Usage

Use the `proxy` utility from `@hairy/utils` to create services that are conditionally available based on environment configuration. This pattern prevents errors when services are not configured.

```typescript
import { proxy } from '@hairy/utils'
import { PrismaClient } from '@prisma/client'

export const prisma = proxy<PrismaClient, { enable: boolean }>(
  undefined,
  { enable: false },
  { strictMessage: 'Prisma is not available, please check your environment variables.' },
)

if (process.env.DATABASE_URL) {
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5,
  })
  prisma.proxy.update(new PrismaClient({ adapter }))
  prisma.enable = true
}
```

## Service Initialization

Check environment variables and initialize the service if available:

```typescript
import { Redis } from 'ioredis'

const redis = proxy<Redis, { enable: boolean }>(
  undefined,
  { enable: false },
  { strictMessage: 'Redis is not available, please check your environment variables.' },
)

if (process.env.REDIS_HOST && process.env.REDIS_PORT) {
  const options: RedisOptions = {
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT!),
  }
  redis.proxy.update(new Redis(options))
  redis.enable = true
}
```

## Using in Modules

Check the `enable` flag before importing modules that depend on the service:

```typescript
import { redis } from './services'
import { RedlockModule } from 'nestjs-redlock-universal'

const imports = [
  redis.enable && RedlockModule.forRoot({
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

* **Type Safety**: The proxy maintains TypeScript types for the wrapped service
* **Graceful Degradation**: Services can be disabled without breaking the application
* **Error Messages**: Custom error messages guide developers when services are unavailable
* **Enable Flag**: Use `enable` property to conditionally import dependent modules
* **Multiple Config Sources**: Support both individual env vars and connection strings (e.g., `REDIS_URL`)
