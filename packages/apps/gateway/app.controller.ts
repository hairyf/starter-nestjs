import type { ClientProxy } from '@nestjs/microservices'
import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('app-controller')
export class AppController {
  constructor(@Inject('PROVIDER_SERVICE') private client: ClientProxy) {}

  @Post()
  @ApiBody({ type: [Number] })
  callService(@Body() nums: number[]) {
    // 返回的是一个Observable对象
    return this.client.send<number>('calc', nums)
  }
}
