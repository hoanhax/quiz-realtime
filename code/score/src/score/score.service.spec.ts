import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { ScoreService } from './score.service'
import { RedisModule } from '../redis/redis.module'
import { KafkaClientModule } from '../kafkaclient/kafka-client.module'
import configuration from '../config/configuration'

describe('ScoreService', () => {
  let service: ScoreService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
        RedisModule,
        KafkaClientModule,
      ],
      providers: [ScoreService],
    }).compile()

    service = module.get<ScoreService>(ScoreService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
