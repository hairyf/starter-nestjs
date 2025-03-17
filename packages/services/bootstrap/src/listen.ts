import type { INestApplication } from '@nestjs/common'
import process from 'node:process'
import { Logger } from '@nestjs/common'
import chalk from 'chalk'
import { microservice } from './microservice'
import { swagger } from './swagger'

export async function withNestjsListen(app: INestApplication, port: string | number = process.env.SERVER_PORT || 3000) {
  const logger = new Logger()

  try {
    await app.listen(port)
    if (microservice)
      logger.log(`${chalk.bold('Microservice:')} ${chalk.gray`Connected`}`)
    logger.log(`${chalk.bold('Listening on:')} ${chalk.gray(`http://localhost:${port}`)}`)
    if (swagger)
      logger.log(`${chalk.bold('Swaggier URL:')} ${chalk.gray(`http://localhost:${port}/swagger/website`)}`)
    if (process.env.NODE_ENV)
      logger.log(`${chalk.bold('Environments:')} ${chalk.gray(process.env.NODE_ENV)}`)
  }
  catch (error: any) {
    if (error.code !== 'EADDRINUSE')
      throw error
    logger.error(`Port ${port} is in use, trying ${+port + 1}`)
    await withNestjsListen(app, +port + 1)
  }
}
