import { Injectable, Inject, Logger } from '@nestjs/common'
import { Redis } from 'ioredis'
import { ClientKafka } from '@nestjs/microservices'

import { JoinQuizDto } from './dto/join-quiz'
import { UpdateScoreDto } from './dto/update-score'

import { MODULE_NAMES } from '../share/enums/module-name.enum'
import { REDIS_CONSTANTS } from '../share/constants/common.constants'
import { KAFKA_TOPICS } from '../share/enums/kafka-topic.enum'

@Injectable()
export class ScoreService {
  private readonly logger = new Logger(ScoreService.name)

  constructor(
    @Inject(MODULE_NAMES.REDIS_CLIENT) private readonly redisClient: Redis,
    @Inject(MODULE_NAMES.KAFKA_CLIENT)
    private readonly kafkaClient: ClientKafka,
  ) {}

  /**
   * Handle logic for user join a quiz
   * Add userId to Redis with score is 0
   *
   * @param message JoinQuizDto
   */
  async handleUserJoined(message: JoinQuizDto) {
    const key = `${REDIS_CONSTANTS.SET_KEY}:${message.quizId}`
    // We use zincrby with 0 value here to avoid the case
    // user join multiple times
    const result = await this.redisClient.zincrby(key, 0, message.userId)

    // const result = await this.redisClient.zadd(key, 0, message.userId)

    this.logger.log('Handle user joined:', message)
    this.logger.log(result)

    const finalScore = result
    const syncMessage = {
      quizId: message.quizId,
      userId: message.userId,
      score: finalScore,
    }

    // Send message to kafka to notify leaderboard score synced
    // Then leadboard can send event via SSE to client
    this.kafkaClient.emit(KAFKA_TOPICS.SCORE_SYNCED, syncMessage)

    // TODO
    // Need to store user information with score=0 to database
  }

  /**
   * Handle logic when score is update (user answer a question)
   *
   * @param message UpdateScoreDto
   */
  async handleScoreUpdate(message: UpdateScoreDto) {
    this.logger.log('Handle score update:', message)
    const key = `${REDIS_CONSTANTS.SET_KEY}:${message.quizId}`
    const scoreIncrement = message.scoreIncrement
    // Update score to redis set
    const result = await this.redisClient.zincrby(
      key,
      scoreIncrement,
      message.userId,
    )
    const finalScore = parseFloat(result)
    const syncMessage = {
      quizId: message.quizId,
      userId: message.userId,
      score: finalScore,
    }

    // Send message to kafka to notify leaderboard score synced
    // Then leadboard can send event via SSE to client
    this.kafkaClient.emit(KAFKA_TOPICS.SCORE_SYNCED, syncMessage)

    // TODO
    // Need to update user score into database
  }
}
