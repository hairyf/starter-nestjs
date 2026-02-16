---
name: core-bootstrap-pattern
description: Functional bootstrap pattern for NestJS application configuration
---

# Bootstrap Pattern

## Usage

Use functional configuration functions (`withNestjs*`) to set up your NestJS application. This pattern keeps `main.ts` clean and makes configuration modular and testable.

```typescript
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  withNestjsBigintRepair,
  withNestjsCors,
  withNestjsListen,
  withNestjsSwagger,
} from './bootstrap'

async function main() {
  const app = await NestFactory.create(AppModule)

  withNestjsBigintRepair(app)
  withNestjsSwagger(app, config => config
    .setTitle('Website')
    .setDescription('The website API')
    .setVersion('1.0'))
  withNestjsCors(app)
  withNestjsListen(app)
}

main()
```

## Implementation Pattern

Each bootstrap function accepts `INestApplication` and optionally a configuration callback:

```typescript
import type { INestApplication } from '@nestjs/common'

export function withNestjsSwagger(
  app: INestApplication,
  setup?: (config: DocumentBuilder) => DocumentBuilder
) {
  const config = new DocumentBuilder()
  setup?.(config)
  const document = SwaggerModule.createDocument(app, config.build())
  SwaggerModule.setup('swagger/website', app, document, {
    jsonDocumentUrl: 'swagger/json',
  })
}
```

## Key Points

* **Separation of Concerns**: Each bootstrap function handles one aspect of configuration
* **Composability**: Functions can be combined in any order
* **Testability**: Each function can be tested independently
* **Optional Configuration**: Use callbacks for flexible configuration without creating wrapper modules
* **Export Pattern**: Use barrel exports (`index.ts`) to simplify imports
