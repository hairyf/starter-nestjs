---
name: nestjs-best-practices
description: Comprehensive best practices and patterns for NestJS applications
metadata:
  author: Hairyf
  version: "2026.01.29"
  source: Internal Documentation
---

> Based on starter-nestjs project. Application setup uses nestjs-extras-w; focuses on production-ready patterns and service configuration.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Application Setup | App configuration via nestjs-extras-w (CORS, Swagger, listen, decimal repair) | [core-bootstrap-pattern](references/core-bootstrap-pattern.md) |
| Service Proxy | Optional service pattern using proxy utilities | [core-service-proxy](references/core-service-proxy.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| BigInt Serialization | Fixing JSON serialization for BigInt and Decimal types | [best-practices-bigint-serialization](references/best-practices-bigint-serialization.md) |
| Conditional Modules | Dynamic module imports based on service availability | [best-practices-conditional-modules](references/best-practices-conditional-modules.md) |
| Swagger Setup | Configurable Swagger/OpenAPI documentation setup | [best-practices-swagger-setup](references/best-practices-swagger-setup.md) |
| Port Handling | Automatic port increment when port is in use | [best-practices-port-handling](references/best-practices-port-handling.md) |
