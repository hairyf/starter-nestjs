import type { INestApplication } from '@nestjs/common'
import type { MicroserviceOptions } from '@nestjs/microservices'
import { app as appConfig } from '../constants'

export async function withNestjsMicroservice(app: INestApplication, service?: any) {
  if (!service || !service.microservice)
    return

  const microservice = app.connectMicroservice<MicroserviceOptions>(service.microservice)

  appConfig.microservice ??= {} as any
  Object.assign(
    appConfig.microservice as any,
    service.microservice,
    {
      instance: microservice,
    },
  )
  await app.startAllMicroservices()
}
