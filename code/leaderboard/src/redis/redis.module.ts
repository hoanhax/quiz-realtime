import { Logger, Module } from '@nestjs/common'
import Redis from 'ioredis'
import { MODULE_NAMES } from '../share/enums/module-name.enum'

import { ConfigService } from '@nestjs/config'

@Module({
  imports: [],
  providers: [
    {
      provide: MODULE_NAMES.REDIS_CLIENT,
      useFactory: (configService: ConfigService) => {
        const logger = new Logger(MODULE_NAMES.REDIS_CLIENT)
        const redis = new Redis({
          host: configService.get<string>('redis.host'),
          port: configService.get<number>('redis.port'),
        })

        redis.on('connect', () => {
          logger.log('Connected to Redis')
        })

        redis.on('error', (error) => {
          logger.error('Redis error:', error)
        })

        return redis
      },
      inject: [ConfigService],
    },
  ],
  exports: [MODULE_NAMES.REDIS_CLIENT],
})
export class RedisModule {}
