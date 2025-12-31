import type { INestApplication, INestMicroservice } from '@nestjs/common'
import type { CustomTransportStrategy, GrpcOptions, KafkaOptions, MqttOptions, NatsOptions, RedisOptions, RmqOptions, TcpOptions } from '@nestjs/microservices'
import process from 'node:process'

export interface CustomStrategy {
  transport?: 'custom'
  strategy: CustomTransportStrategy
  options?: Record<string, any>
}

export type MicroserviceOptions = GrpcOptions | TcpOptions | RedisOptions | NatsOptions | MqttOptions | RmqOptions | KafkaOptions | CustomStrategy

let _url: string | undefined

export const app = {
  instance: undefined as INestApplication | undefined,
  port: undefined as string | number | undefined,
  env: process?.env?.NODE_ENV as 'development' | 'production',
  get url() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      if (this.port)
        return `http://localhost:${this.port}`
    }
    return _url
  },
  set url(value) {
    _url = value
  },
  microservice: undefined as (MicroserviceOptions & { instance: INestMicroservice | undefined }) | undefined,
}
