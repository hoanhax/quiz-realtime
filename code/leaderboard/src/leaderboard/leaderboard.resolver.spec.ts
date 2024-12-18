import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'

import { LeaderboardResolver } from './leaderboard.resolver'
import { LeaderboardService } from './leaderboard.service'
import { RedisModule } from '../redis/redis.module'
import configuration from '../config/configuration'

describe('LeaderboardResolver', () => {
  let resolver: LeaderboardResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
        RedisModule,
      ],
      providers: [LeaderboardResolver, LeaderboardService],
    }).compile()

    resolver = module.get<LeaderboardResolver>(LeaderboardResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
