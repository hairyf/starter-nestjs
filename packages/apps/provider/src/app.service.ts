/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices'

@Injectable()
export class AppService {
  @MessagePattern('calc')
  async accumulate(@Payload() nums: number[]): Promise<number> {
    return await new Promise((resolve) => {
      setTimeout(() => resolve(nums.reduce((pre, cur) => pre + cur, 0)), 10)
    })
  }

  @EventPattern('schedule')
  async handleSchedule(data: any) {
    console.log(data)
  }
}
