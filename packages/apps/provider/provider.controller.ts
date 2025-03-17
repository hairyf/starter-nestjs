import type { ProviderService } from './provider.service'
import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

@Controller()
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @MessagePattern('calc')
  async accumulate(@Payload() nums: number[]): Promise<number> {
    return await new Promise((resolve) => {
      setTimeout(() => resolve(nums.reduce((pre, cur) => pre + cur, 0)), 10)
    })
  }
}
