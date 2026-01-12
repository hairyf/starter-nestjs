import process from 'node:process'
import { proxy } from '@hairy/utils'
import { Redis, RedisOptions } from 'ioredis'

export const redis = proxy<Redis>()

if (process.env.REDIS_HOST && process.env.REDIS_PORT) {
  const options: RedisOptions = {
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT!),
  }
  redis.proxy.update(new Redis(options))
}
else if (process.env.REDIS_URL) {
  redis.proxy.update(new Redis(process.env.REDIS_URL!))
}

export const isRedisAvailable = redis.proxy.original() !== undefined
