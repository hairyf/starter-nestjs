import type { ClientProxy } from '@nestjs/microservices'
import { Inject, Injectable } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'

@Injectable()
export class AppService {
  constructor(
    @Inject('@service/provider') public microservice: ClientProxy,
  ) {}

  @Interval(3000)
  async interval() {
    this.microservice.emit('schedule', `Test Schedule Send Other Provider, Time: ${new Date().toISOString()}`)
  }
}
