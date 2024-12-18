import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'

import { QuizResolver } from './quiz.resolver'
import { QuizService } from './quiz.service'
import { KafkaClientModule } from '../kafkaclient/kafka-client.module'
import configuration from '../config/configuration'

describe('QuizResolver', () => {
  let resolver: QuizResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
        KafkaClientModule,
      ],
      providers: [QuizResolver, QuizService],
    }).compile()

    resolver = module.get<QuizResolver>(QuizResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
