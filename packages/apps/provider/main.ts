import type { MicroserviceOptions } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { service } from './package.json'
import { ProviderModule } from './provider.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProviderModule,
    {
      transport: Transport.TCP,
      options: {
        host: service.host || '127.0.0.1',
        port: service.port,
      },
    },
  )

  await app.listen()
}
bootstrap()
