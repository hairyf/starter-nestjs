import type { MicroserviceOptions } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { service } from './package.json'
import { ScheduleModule } from './schedule.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ScheduleModule,
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
