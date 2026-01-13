import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import { ScheduleModule as NestjsScheduleModule } from '@nestjs/schedule'
import { microservices } from '@service/core'
import { AppService } from './app.service'

@Module({
  imports: [
    NestjsScheduleModule.forRoot(),
    ClientsModule.register(microservices()),
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
