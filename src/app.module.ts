import { DynamicModule, Module } from '@nestjs/common'
import { IoredisAdapter, RedlockModule } from 'nestjs-redlock-universal'
import { AppController } from './app.controller'
import { isRedisAvailable, redis } from './services'

const imports = [
  isRedisAvailable && RedlockModule.forRoot({
    nodes: [new IoredisAdapter(redis)],
    defaultTtl: 30000,
  }),
]

@Module({
  controllers: [AppController],
  providers: [],
  imports: imports.filter(Boolean) as DynamicModule[],
})
export class AppModule {}
