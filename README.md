# Microservices NestJS

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

A modern microservices architecture built with NestJS, providing a flexible and scalable foundation for building distributed applications.

## 📋 Overview

This project implements a complete microservices ecosystem using NestJS, with the following key components:

- **Gateway Service**: Routes requests to appropriate microservices (port 3000)
- **Provider Service**: Handles provider-specific business logic (port 4000)
- **Schedule Service**: Manages scheduling operations (port 5000)

## 🚀 Features

- Gateway-based architecture with microservices communication
- Automatic service discovery and registration
- Swagger API documentation
- Multi-database support with Prisma
- Built-in scheduling capabilities
- Comprehensive tooling for microservices development

## 🏗️ Project Structure

```
packages/
├── apps/                  # Applications
│   ├── gateway/           # Main API gateway
│   ├── provider/          # Provider microservice
│   └── schedule/          # Scheduling microservice
└── services/              # Shared services
    ├── bootstrap/         # Application bootstrap utilities
    ├── databases/         # Database configurations and clients
    └── microservices/     # Microservices communication tools
```

## 🛠️ Getting Started

Before that, you need to meet the following conditions:

- Node.js 18+
- pnpm 10+
- A database (PostgreSQL, MySQL, etc.)
- Docker & Docker Compose (optional, for containerized deployment)

### Install

```bash
# Clone the repository and navigate to the project root
npx degit hairyf/starter-nestjs my-project
cd my-project

# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

## ⚙️ Configuration

### Environment Variables

The project uses a `.env` file for configuration. Create one in the root directory with the following variables:

```
DATABASE_URL=mysql://username:password@localhost:3306
```

Key environment variables:
- `DATABASE_URL`: Connection string for your database (PostgreSQL, MySQL, etc.)

### Docker Deployment

The project includes a `docker-compose.yml` file for easy deployment:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

The Docker Compose configuration:
- **Gateway**: Exposed on port 3000
- **Provider**: Exposed on port 4000
- **Schedule**: Exposed on port 5000

> All services share an internal network

## 💻 Development Guide

### Service Configuration

Each application defines its service configuration in its `package.json` file:

```json
{
  "service": {
    "microservice": true,
    "host": "localhost",
    "port": 4000
  },
  "depends": [
    "@project/schedule"
  ]
}
```

### Creating a New Microservice

1. Create a new directory in `packages/apps/`
2. Add a `package.json` with the required configuration
3. Create the main entry file and module file

Example main entry file:
```typescript
// main.ts
import { NestFactory } from '@nestjs/core'
import { withNestjsListen, withNestjsMicroservice } from '@project/bootstrap'
import { service } from './package.json'
import { YourServiceModule } from './your-service.module'

async function bootstrap() {
  const app = await NestFactory.create(YourServiceModule)
  await withNestjsMicroservice(app, service)
  await withNestjsListen(app, service.port)
}

bootstrap()
```

### Microservices Communication

Services communicate using NestJS's built-in microservices capabilities:

**Sending Messages**:

```typescript
@Controller()
export class AppController {
  constructor(@Inject('@project/your-service') private client: ClientProxy) {}

  callService(data: any) {
    return this.client.send('pattern', data) // Request-response
  }
}
```

**Receiving Messages**:

```typescript
@Controller()
export class YourServiceController {
  @MessagePattern('pattern')
  handleMessage(@Payload() data: any) {
    return result
  }
}
```

### Database Configuration

Configure databases in `packages/services/databases/dbs.config.ts`:

```typescript
const databases: Database[] = [
  {
    name: 'db1', // module name
    database: 'database_name', // database name
    schema: './prisma/schema.prisma'
  }
]

export default databases
```

run `pnpm prisma:push` to generate Prisma client code

and use them in your services:

```typescript
// In your service
import { db1 } from '@project/databases'

@Injectable()
export class YourService {
  async findUsers() {
    return await db1.user.findMany()
  }
}
```

## 📄 License

[MIT](LICENSE.md)
