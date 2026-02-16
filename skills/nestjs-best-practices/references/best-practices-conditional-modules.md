---
name: best-practices-conditional-modules
description: Dynamic module imports based on service availability
---

# Conditional Module Imports

## Usage

Import modules conditionally based on service availability flags. This allows the application to work with or without optional services.

```typescript
import { DynamicModule, Module } from '@nestjs/common'
import { IoredisAdapter, RedlockModule } from 'nestjs-redlock-universal'
import { redis } from './services'

const imports = [
  redis.enable && RedlockModule.forRoot({
    nodes: [new IoredisAdapter(redis)],
    defaultTtl: 30000,
  }),
]

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: imports.filter(Boolean) as DynamicModule[],
})
export class AppModule {}
```

## Pattern Breakdown

1. **Create Array**: Build an array of module configurations
2. **Conditional Addition**: Use `service.enable && ModuleConfig` to conditionally add modules
3. **Filter Falsy Values**: Use `.filter(Boolean)` to remove `undefined` or `false` entries
4. **Type Assertion**: Cast to `DynamicModule[]` for TypeScript compatibility

## Alternative Pattern

For multiple conditional modules:

```typescript
const imports: DynamicModule[] = []

if (redis.enable) {
  imports.push(RedlockModule.forRoot({
    nodes: [new IoredisAdapter(redis)],
    defaultTtl: 30000,
  }))
}

if (prisma.enable) {
  imports.push(PrismaModule.forRoot({ ... }))
}

@Module({
  imports,
})
export class AppModule {}
```

## Key Points

* **Service Flags**: Use `enable` property from proxy pattern to check availability
* **Type Safety**: Type assertion ensures TypeScript accepts the filtered array
* **No Runtime Errors**: Missing services won't cause module initialization failures
* **Clean Syntax**: Array filter pattern is more concise than multiple if statements
* **Order Matters**: Modules are imported in array order
