import { Controller } from '@nestjs/common'
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices'

@Controller()
export class ProviderController {
  @MessagePattern('calc')
  async accumulate(@Payload() nums: number[]): Promise<number> {
    return await new Promise((resolve) => {
      setTimeout(() => resolve(nums.reduce((pre, cur) => pre + cur, 0)), 10)
    })
  }

  @EventPattern('schedule')
  async handleSchedule(data: any) {
    // eslint-disable-next-line no-console
    console.log(data)
  }
}
