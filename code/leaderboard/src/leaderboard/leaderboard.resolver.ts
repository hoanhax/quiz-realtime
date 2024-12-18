import { Resolver, Args, Query } from '@nestjs/graphql'
import { LeaderboardService } from './leaderboard.service'
import { Logger } from '@nestjs/common'

import { Participant } from './entities/participant.model'
import { QueryParticipantInput } from './dto/query-participant.input'

@Resolver()
export class LeaderboardResolver {
  private readonly logger = new Logger(LeaderboardResolver.name)

  constructor(private readonly leaderboardService: LeaderboardService) {}

  /**
   * Query to return list participant for a quizId
   * After join a quiz, client will get list participants
   * Then when have any update for user score, backend will send this event
   * to client via SSE, base on the score/userId value client can sort base on
   * score and build a leaderboard.
   *
   * @param queryParticipantInput Input data send from clien to query list participants
   * @returns
   */
  @Query(() => [Participant])
  async participants(
    @Args('queryParticipantInput') queryParticipantInput: QueryParticipantInput,
  ) {
    try {
      const result = await this.leaderboardService.getParticipant(
        queryParticipantInput,
      )
      return result
    } catch (error) {
      this.logger.error('Error fetching participants', error)
      throw new Error('Failed to fetch participants')
    }
  }
}
