import { NestFactory } from '@nestjs/core'
import {
  withNestjsBigintRepair,
  withNestjsCors,
  withNestjsListen,
  withNestjsMicroservice,
  withNestjsSwagger,
} from '@service/core'
import { service } from '../package.json'
import { ScheduleModule } from './schedule.module'

async function bootstrap() {
  const app = await NestFactory.create(ScheduleModule)

  withNestjsBigintRepair(app)
  withNestjsSwagger(app, config => config
    .setTitle('Website')
    .setDescription('The website API')
    .setVersion('1.0'))

  withNestjsCors(app)

  await withNestjsMicroservice(app, service)
  await withNestjsListen(app, service.port)
}
bootstrap()
