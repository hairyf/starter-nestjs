import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('app-controller')
export class AppController {
  @Get()
  async getHello(): Promise<string> {
    return 'Hello World'
  }
}
