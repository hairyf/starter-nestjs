import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import { microservices } from '@project/microservices'
import { AppController } from './app.controller'

@Module({
  imports: [
    ClientsModule.register(microservices()),
  ],
  controllers: [AppController],
})

export class AppModule {}
