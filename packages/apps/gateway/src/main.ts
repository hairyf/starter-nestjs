import { NestFactory } from '@nestjs/core'
import { withNestjsListen } from '@service/core'
import { service } from '../package.json'
import { AppModule } from './app.module'

async function main() {
  const app = await NestFactory.create(AppModule)

  await withNestjsListen(app, service.port)
}

main()
