import { NestFactory } from '@nestjs/core'
import { withNestjsListen } from '@project/bootstrap'
import { AppModule } from './app.module'
import { service } from './package.json'

async function main() {
  const app = await NestFactory.create(AppModule)

  await withNestjsListen(app, service.port)
}

main()
