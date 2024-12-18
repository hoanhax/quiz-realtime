import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { QuizService } from './quiz.service'
import { JoinQuizInput } from './dto/join-quiz'
import { AnswerQuizInput } from './dto/answer-quiz'
import { Logger } from '@nestjs/common'

@Resolver()
export class QuizResolver {
  private readonly logger = new Logger(QuizResolver.name)

  constructor(private readonly quizService: QuizService) {}

  // Used to init root query
  @Query(() => String)
  async quiz(): Promise<string> {
    return ''
  }

  /**
   * Mutation to handle logic when user join a quiz
   * @param joinQuizInput JoinQuizInput
   * @returns
   */
  @Mutation(() => String)
  async joinQuiz(
    @Args('joinQuizInput') joinQuizInput: JoinQuizInput,
  ): Promise<string> {
    const quizId = joinQuizInput.quizId
    this.quizService.joinQuiz(joinQuizInput)
    return quizId
  }

  /**
   * Mutation to handle when user answer a quiz
   *
   * @param answerQuizInput AnswerQuizInput
   * @returns
   */
  @Mutation(() => String)
  async answerQuiz(
    @Args('answerQuizInput') answerQuizInput: AnswerQuizInput,
  ): Promise<string> {
    this.logger.log('AnswerQuiz Mutation', answerQuizInput)
    const quizId = answerQuizInput.quizId

    const updateScoreDto = {
      quizId: answerQuizInput.quizId,
      userId: answerQuizInput.userId,
      scoreIncrement: this.quizService.calculateScore(answerQuizInput),
    }
    this.quizService.updateScore(updateScoreDto)
    return quizId
  }
}
