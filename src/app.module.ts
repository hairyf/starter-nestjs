import { DynamicModule, Module } from '@nestjs/common'
import { IoredisAdapter, RedlockModule } from 'nestjs-redlock-universal'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { isRedisAvailable, redis } from './services'

const imports = [
  isRedisAvailable && RedlockModule.forRoot({
    nodes: [new IoredisAdapter(redis)],
    defaultTtl: 30000,
  }),
]

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: imports.filter(Boolean) as DynamicModule[],
})
export class AppModule {}
