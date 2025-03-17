# NestJS Starter Project

A starter template for NestJS applications with MySQL database integration.

## Description

This project provides a foundation for building scalable and maintainable backend applications using NestJS framework. It comes with pre-configured MySQL database connection and basic project structure to help you get started quickly.

## Prerequisites

- Node.js (v14 or later)

## Environment Configuration

The project uses a `.env` file for environment configuration. Make sure to configure the following variables:

```
DATABASE_URL = <db>://<username>:<password>@<host>:<port>/<database_name>
SERVER_PORT = 3000
```

> You can check it out [prisma](https://www.prisma.io/docs/getting-started) for more information about the DATABASE_URL.

## Running the Application

```bash
# Development mode
pnpm dev

# Production mode
pnpm build
pnpm start
```

Once the application is running, you can access the API documentation at:
`http://localhost:3000/swagger/website`

## License

[MIT](LICENSE)
