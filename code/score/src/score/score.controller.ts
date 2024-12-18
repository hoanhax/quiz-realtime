import { Controller, Inject, Logger } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { Redis } from 'ioredis'

import { KAFKA_TOPICS } from '../share/enums/kafka-topic.enum'
import { MODULE_NAMES } from 'src/share/enums/module-name.enum'
import { ScoreService } from './score.service'
import { JoinQuizDto } from './dto/join-quiz'
import { UpdateScoreDto } from './dto/update-score'

@Controller()
export class ScoreController {
  private readonly logger = new Logger(ScoreController.name)

  constructor(
    private readonly scoreService: ScoreService,
    @Inject(MODULE_NAMES.REDIS_CLIENT) private readonly redisClient: Redis,
  ) {}

  /**
   * Consume mesasge from Kafka base on topic USER_JOINED
   * Score service using nestjs microservice, so we can use @EventPattern
   * to consume event from Kafka
   *
   * @param message JoinQuizDto
   */
  @EventPattern(KAFKA_TOPICS.USER_JOINED)
  handleUserJoined(@Payload() message: JoinQuizDto) {
    this.logger.log('USER_JOINED event:', message)
    this.scoreService.handleUserJoined(message)
  }

  /**
   * Consume mesasge from Kafka for event SCORE_UPDATE
   * @param message UpdateScoreDto
   */
  @EventPattern(KAFKA_TOPICS.SCORE_UPDATE)
  async handleScoreUpdate(@Payload() message: UpdateScoreDto) {
    this.logger.log('SCORE_UPDATE event:', message)
    await this.scoreService.handleScoreUpdate(message)
  }
}
