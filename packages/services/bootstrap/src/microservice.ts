import type { INestApplication } from '@nestjs/common'
import type { MicroserviceOptions } from '@nestjs/microservices'
import { Transport } from '@nestjs/microservices'

interface Options {
  host: string
  ports: Record<string, number>
}

export async function withNestjsMicroservice(app: INestApplication, options: Options) {
  if (!options.ports.tcp)
    return
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: options.host,
      port: options.ports.tcp,
    },
  })
  await app.startAllMicroservices()
}
