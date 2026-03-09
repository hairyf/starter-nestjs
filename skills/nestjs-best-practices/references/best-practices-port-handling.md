---
name: best-practices-port-handling
description: Automatic port increment when port is already in use
---

# Port Handling with Auto-Increment

## Usage

This project uses `startNestjsListen(app)` from `nestjs-extras-w`. It listens on `process.env.SERVER_PORT` or 3000, and if the port is in use (`EADDRINUSE`), automatically tries the next port.

```typescript
import { startNestjsListen } from 'nestjs-extras-w'

async function main() {
  const app = await NestFactory.create(AppModule)
  // ... withDecimalRepair, withNestjsSwagger, withNestjsCors
  startNestjsListen(app)
}
```

## How It Works (nestjs-extras-w)

1. **Attempt Listen**: Tries the port from `process.env.SERVER_PORT` or 3000
2. **EADDRINUSE**: If the port is in use, retries with the next port
3. **Logging**: Logs the listening URL; other errors are re-thrown

## Key Points

* **Development Friendly**: Prevents manual port changes when a port is already in use
* **Env Config**: Uses `SERVER_PORT` or defaults to 3000
* **Provided by nestjs-extras-w**: Call `startNestjsListen(app)` in `main.ts`
