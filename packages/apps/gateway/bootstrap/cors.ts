import type { INestApplication } from '@nestjs/common'

export function withNestjsCors(app: INestApplication) {
  app.enableCors()
}
