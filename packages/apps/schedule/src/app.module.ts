import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ScheduleModule as NestjsScheduleModule } from '@nestjs/schedule'
import { AppService } from './app.service'

@Module({
  imports: [
    NestjsScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: '@service/provider',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4001,
        },
      },
    ]),
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
