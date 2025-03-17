import { Module } from '@nestjs/common'
import { ScheduleModule as NestjsScheduleModule } from '@nestjs/schedule'
import { ScheduleService } from './schedule.service'

@Module({
  imports: [
    NestjsScheduleModule.forRoot(),
  ],
  providers: [
    ScheduleService,
  ],
})
export class ScheduleModule {}
