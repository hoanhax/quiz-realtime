import { Injectable, Inject, Logger } from '@nestjs/common'
import { QueryParticipantInput } from './dto/query-participant.input'
import { Participant } from './entities/participant.model'
import { Redis } from 'ioredis'

import { MODULE_NAMES } from '../share/enums/module-name.enum'
import { REDIS_CONSTANTS } from '../share/constants/common.constants'

@Injectable()
export class LeaderboardService {
  private readonly logger = new Logger(LeaderboardService.name)
  constructor(
    @Inject(MODULE_NAMES.REDIS_CLIENT) private readonly redisClient: Redis,
  ) {}

  /**
   * Get list participant base on quizId from Redis
   * @param input Input data
   * @returns Promise<Participant[] | []>
   */
  async getParticipant(
    input: QueryParticipantInput,
  ): Promise<Participant[] | []> {
    const key = `${REDIS_CONSTANTS.SET_KEY}:${input.quizId}`
    const offset = input.offset
    const limit = input.limit
    try {
      // Get data base on limit/offset and also return score
      const result = await this.redisClient.zrevrange(
        key,
        offset,
        limit,
        'WITHSCORES',
      )
      const participants = this.parseParticipantResult(result, offset)
      return participants
    } catch (error) {
      this.logger.error(
        `Failed to get participants for quizId ${input.quizId}:`,
        error,
      )
      return []
    }
  }

  /**
   * Parse result return from redis into Participant list
   *
   * @param result string[] Result from redis result has format: [ 'userId1', '10', 'userId2', '5' ]
   * @param offset number Offset value
   * @returns Participant[]
   */
  parseParticipantResult(result: string[], offset: number): Participant[] {
    const participants = []
    try {
      for (let i = 0; i < result.length; i += 2) {
        participants.push({
          position: offset + i / 2 + 1, // Calculate rank based on offset
          userId: result[i],
          score: parseFloat(result[i + 1]),
        })
      }
    } catch (error) {
      this.logger.error('Error parsing participant results:', error)
    }
    return participants
  }
}
