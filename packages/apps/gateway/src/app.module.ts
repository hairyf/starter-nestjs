import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AppController } from './app.controller'

@Module({
  controllers: [AppController],
  imports: [
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
})

export class AppModule {}
