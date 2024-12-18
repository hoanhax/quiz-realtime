import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { RedisModule } from '../redis/redis.module'

import { LeaderboardService } from './leaderboard.service'
import configuration from '../config/configuration'

describe('LeaderboardService', () => {
  let service: LeaderboardService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
        RedisModule,
      ],
      providers: [LeaderboardService],
    }).compile()

    service = module.get<LeaderboardService>(LeaderboardService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
