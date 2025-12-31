import type { INestApplication } from '@nestjs/common'
import process from 'node:process'
import { delay, to } from '@hairy/utils'
import { Logger } from '@nestjs/common'
import { bold, gray } from 'chalk'
import { app as appConfig } from '../constants'
import { swagger } from './swagger'

const logger = new Logger()

export async function withNestjsListen(app: INestApplication, port: string | number = process.env.SERVER_PORT || 3000) {
  const [error] = await to(app.listen(port))

  if (error) {
    loggerTryPort(port)
    await delay(1000)
    await withNestjsListen(app, port)
    return
  }
  appConfig.instance = app
  appConfig.port = port
  process.on('SIGINT', () => close(app))
  loggerListen()
}

function loggerListen() {
  if (appConfig.microservice)
    logger.log(`${bold('Microservice:')}  ${gray`Enabled`}`)

  logger.log(`${bold('Listening on: ')} ${gray(appConfig.url)}`)

  if (swagger)
    logger.log(`${bold('Swagger URL:  ')} ${gray(`${appConfig.url}/swagger/website`)}`)

  if (process.env.NODE_ENV)
    logger.log(`${bold('Environment:  ')} ${gray(process.env.NODE_ENV)}`)
}

async function close(app: INestApplication) {
  await app.close()
  logger.log(`${bold('Server:')} ${gray`Closed`}`)
  process.exit(0)
}

function loggerTryPort(port: string | number) {
  logger.error(`Port ${port} is in use, waiting for it to be free...`)
}
