import { Inject, Injectable, Logger } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'

import { JoinQuizInput } from './dto/join-quiz'
import { AnswerQuizInput } from './dto/answer-quiz'
import { UpdateScoreDto } from './dto/update-score'

import { KAFKA_TOPICS } from '../share/enums/kafka-topic.enum'
import { MODULE_NAMES } from '../share/enums/module-name.enum'

@Injectable()
export class QuizService {
  private readonly logger = new Logger(QuizService.name)

  constructor(
    @Inject(MODULE_NAMES.KAFKA_CLIENT) private kafkaClient: ClientKafka,
  ) {}

  async joinQuiz(joinQuizInput: JoinQuizInput): Promise<string> {
    // Send to Kafka topic
    const quizId = joinQuizInput.quizId
    this.kafkaClient.emit(KAFKA_TOPICS.USER_JOINED, joinQuizInput)
    this.logger.log('Produce kafka message for join quiz', joinQuizInput)

    return quizId
  }

  calculateScore(answerQuizInput: AnswerQuizInput) {
    // Mock to return 1 for every answer
    return 1
  }

  async updateScore(updateScoreDto: UpdateScoreDto): Promise<string> {
    this.kafkaClient.emit(KAFKA_TOPICS.SCORE_UPDATE, updateScoreDto)
    this.logger.log('Produce kafka message for score update', updateScoreDto)
    return updateScoreDto.quizId
  }
}
