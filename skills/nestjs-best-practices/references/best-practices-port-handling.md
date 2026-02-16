---
name: best-practices-port-handling
description: Automatic port increment when port is already in use
---

# Port Handling with Auto-Increment

## Usage

Automatically try the next available port if the configured port is already in use. This prevents startup failures in development environments.

```typescript
import type { INestApplication } from '@nestjs/common'
import process from 'node:process'
import { styleText } from 'node:util'
import { Logger } from '@nestjs/common'

export async function withNestjsListen(
  app: INestApplication,
  port: string | number = process.env.SERVER_PORT || 3000
) {
  const logger = new Logger('Listen')

  try {
    await app.listen(port)
    logger.log(`${styleText('bold', 'Listening on:')} ${styleText('gray', ` http://127.0.0.1:${port}`)}`)
  }
  catch (error: any) {
    if (error.code !== 'EADDRINUSE')
      throw error
    logger.error(`Port ${port} is in use, trying ${+port + 1}`)
    await withNestjsListen(app, +port + 1)
  }
}
```

## How It Works

1. **Attempt Listen**: Try to listen on the specified port
2. **Check Error Code**: If error is `EADDRINUSE`, the port is in use
3. **Recursive Retry**: Recursively call with `port + 1`
4. **Re-throw Other Errors**: Non-port errors are re-thrown immediately

## Logging

Provide clear feedback about port changes:

```typescript
logger.log(`${styleText('bold', 'Listening on:')} ${styleText('gray', ` http://127.0.0.1:${port}`)}`)
logger.log(`${styleText('bold', 'Swaggier URL:')} ${styleText('gray', ` http://127.0.0.1:${port}/swagger/website`)}`)
```

## Key Points

* **Development Friendly**: Prevents manual port changes during development
* **Error Handling**: Only handles `EADDRINUSE`, other errors propagate
* **Recursive Pattern**: Uses recursion for clean retry logic
* **Type Coercion**: Use `+port` to convert string ports to numbers
* **Default Fallback**: Falls back to port 3000 if `SERVER_PORT` is not set
* **Visual Feedback**: Use `styleText` for colored console output
