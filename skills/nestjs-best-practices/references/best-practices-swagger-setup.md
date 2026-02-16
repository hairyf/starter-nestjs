---
name: best-practices-swagger-setup
description: Configurable Swagger/OpenAPI documentation setup pattern
---

# Swagger Setup

## Usage

Configure Swagger with a flexible callback pattern that allows customization without creating wrapper modules.

```typescript
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function withNestjsSwagger(
  app: INestApplication,
  setup?: (config: DocumentBuilder) => DocumentBuilder
) {
  const config = new DocumentBuilder()
  setup?.(config)
  const document = SwaggerModule.createDocument(app, config.build())
  SwaggerModule.setup(
    'swagger/website',
    app,
    document,
    {
      jsonDocumentUrl: 'swagger/json',
    },
  )
}
```

## Configuration

Use the callback to customize Swagger metadata:

```typescript
withNestjsSwagger(app, config => config
  .setTitle('Website')
  .setDescription('The website API')
  .setVersion('1.0')
  .addTag('users', 'User management endpoints')
  .addBearerAuth())
```

## Controller Integration

Use `@ApiTags()` decorator to organize endpoints:

```typescript
import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('app-controller')
export class AppController {
  @Get()
  async getHello(): Promise<string> {
    return 'Hello World'
  }
}
```

## Key Points

* **Callback Pattern**: Optional callback allows configuration without creating wrapper classes
* **Builder Pattern**: `DocumentBuilder` provides fluent API for configuration
* **Custom Paths**: Use custom paths like `swagger/website` instead of default `/api`
* **JSON Endpoint**: Always provide `jsonDocumentUrl` for programmatic access
* **Tag Organization**: Use `@ApiTags()` to group related endpoints in the UI
