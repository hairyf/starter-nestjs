import type { MicroserviceOptions } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { ProviderModule } from './provider.module'
// 创建微服务
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProviderModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 4001,
      },
    },
  )
  await app.listen()
}
bootstrap()
