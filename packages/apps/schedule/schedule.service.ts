import { Injectable } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { clients } from '@project/microservices'

@Injectable()
export class ScheduleService {
  constructor(
    public microservices = clients([
      '@project/provider',
    ]),
  ) {}

  @Interval(3000)
  async interval() {
    for (const client of this.microservices) {
      client.emit('schedule', `Test Schedule Send Other Provider, Time: ${new Date().toISOString()}`)
    }
  }
}
