import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('app-controller')
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World'
  }
}
