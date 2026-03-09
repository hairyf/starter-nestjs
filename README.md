# NestJS Starter Project

A starter template for NestJS applications with MySQL database integration.

## Description

This project provides a foundation for building scalable and maintainable backend applications using NestJS. Application bootstrap (CORS, Swagger, listen with port fallback, BigInt/Decimal serialization) is handled by [nestjs-extras-w](https://www.npmjs.com/package/nestjs-extras-w). It includes Prisma and optional Redis/Redlock integration.

## Prerequisites

- Node.js (v14 or later)

## Setup

```sh
# 1. Create environment file
cp .env.example .env
# Edit .env file as needed(if prod)

# 2. Start docker compose service
docker-compose --env-file .env -f docker/docker-compose.service.yml up -d

# 3. Install dependencies
pnpm install

# 4. Run migrations
pnpm prisma migrate dev

# 5. Run the application
pnpm dev # or pnpm start
```

## Running the Application

```bash
# Development mode (watch)
pnpm dev

# Production run
pnpm start
```

Once the application is running, you can access the API documentation at:
`http://localhost:3000/swagger/website`

## License

[MIT](LICENSE)
