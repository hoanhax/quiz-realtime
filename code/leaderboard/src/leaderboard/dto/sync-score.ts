import { MaxLength, IsInt, Min, Max } from 'class-validator'
import { VALIDATION_CONSTANTS } from '../../share/constants/common.constants'

/**
 * Message format when for sync score
 */
export class SyncScoreDto {
  @MaxLength(VALIDATION_CONSTANTS.MAX_QUIZID_LENGTH)
  quizId: string

  @MaxLength(VALIDATION_CONSTANTS.MAX_USERID_LENGTH)
  userId: string

  @IsInt()
  @Min(0) // Minimum allowed score
  @Max(1) // Assumption one answer correct get 1 score
  score: number
}
