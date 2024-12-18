import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RedisModule } from './redis/redis.module'
import { ScoreModule } from './score/score.module'

import configuration from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration], // Load the custom configuration
      isGlobal: true, // Make the configuration globally available
    }),
    RedisModule,
    ScoreModule,
  ],
})
export class AppModule {}
