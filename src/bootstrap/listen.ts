import type { INestApplication } from '@nestjs/common'
import process from 'node:process'
import { Logger } from '@nestjs/common'
import chalk from 'chalk'

export async function withNestjsListen(app: INestApplication, port: string | number = process.env.SERVER_PORT || 3000) {
  const logger = new Logger('Listen')

  try {
    await app.listen(port)
    logger.log(`${chalk.bold('Listening on:')} ${chalk.gray(`http://127.0.0.1:${port}`)}`)
    logger.log(`${chalk.bold('Swaggier URL:')} ${chalk.gray(`http://127.0.0.1:${port}/swagger/json`)}`)
    logger.log(`${chalk.bold('Swaggier URL:')} ${chalk.gray(`http://127.0.0.1:${port}/swagger/website`)}`)
    process.env.NODE_ENV
    && logger.log(`${chalk.bold('Environments:')} ${chalk.gray(process.env.NODE_ENV)}`)
  }
  catch (error: any) {
    if (error.code !== 'EADDRINUSE')
      throw error
    logger.error(`Port ${port} is in use, trying ${+port + 1}`)
    await withNestjsListen(app, +port + 1)
  }
}
