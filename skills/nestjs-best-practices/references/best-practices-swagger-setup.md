---
name: best-practices-swagger-setup
description: Configurable Swagger/OpenAPI documentation setup pattern
---

# Swagger Setup

## Usage

This project uses `withNestjsSwagger` from `nestjs-extras-w`, which supports an optional callback for customization.

```typescript
import { withNestjsSwagger } from 'nestjs-extras-w'

withNestjsSwagger(app, config => config
  .setTitle('Website')
  .setDescription('The website API')
  .setVersion('1.0')
  .addTag('users', 'User management endpoints')
  .addBearerAuth())
```

## Configuration

The second argument is a callback that receives `DocumentBuilder`; use it to set title, version, tags, auth, etc. (see Usage above).

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
