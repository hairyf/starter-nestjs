import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  withNestjsBigintRepair,
  withNestjsCors,
  withNestjsListen,
  withNestjsSwagger,
} from './bootstrap'

async function main() {
  const app = await NestFactory.create(AppModule)

  withNestjsBigintRepair(app)

  withNestjsSwagger(app, config => config
    .setTitle('Website')
    .setDescription('The website API')
    .setVersion('1.0'))

  withNestjsCors(app)
  withNestjsListen(app)
}

main()
