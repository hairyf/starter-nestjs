import type { INestApplication } from '@nestjs/common'
import type { MicroserviceOptions } from '@nestjs/microservices'
import { Transport } from '@nestjs/microservices'

interface Options {
  microservice?: boolean
  host: string
  port: number
}

export let microservice: Options | boolean = false

export async function withNestjsMicroservice(app: INestApplication, options?: Options) {
  if (options?.microservice === false)
    return

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: options?.host,
      port: options?.port,
    },
  })

  microservice = options || true

  await app.startAllMicroservices()
}
