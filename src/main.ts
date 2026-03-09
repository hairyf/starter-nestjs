import { NestFactory } from '@nestjs/core'

import {
  startNestjsListen,
  withDecimalRepair,
  withNestjsCors,
  withNestjsSwagger,
} from 'nestjs-extras-w'

import { AppModule } from './app.module'

async function main() {
  const app = await NestFactory.create(AppModule)

  withDecimalRepair(app)
  withNestjsSwagger(app, config => config
    .setTitle('Website')
    .setDescription('The website API')
    .setVersion('1.0'))

  withNestjsCors(app)
  startNestjsListen(app)
}

main()
