import { Field, InputType, Int } from '@nestjs/graphql'
import { MaxLength, Min, Max } from 'class-validator'
import { VALIDATION_CONSTANTS } from '../../share/constants/common.constants'

/**
 * Input type for Query ParticipantInput
 */
@InputType()
export class QueryParticipantInput {
  @Field()
  @MaxLength(VALIDATION_CONSTANTS.MAX_QUIZID_LENGTH)
  quizId: string

  @Field(() => Int)
  @Min(1)
  @Max(VALIDATION_CONSTANTS.MAX_LIMIT)
  limit: number

  @Field(() => Int)
  @Min(0)
  offset: number
}
