import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'

import { QuizService } from './quiz.service'
import { KafkaClientModule } from '../kafkaclient/kafka-client.module'
import configuration from '../config/configuration'

describe('QuizService', () => {
  let service: QuizService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
        KafkaClientModule,
      ],
      providers: [QuizService],
    }).compile()

    service = module.get<QuizService>(QuizService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
