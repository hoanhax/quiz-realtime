import { MaxLength, IsInt, Min, Max } from 'class-validator'

export class UpdateScoreDto {
  @MaxLength(40)
  quizId: string

  @MaxLength(40)
  userId: string

  @IsInt()
  @Min(0) // Minimum allowed score
  @Max(1) // Assumption one answer correct get 1 score
  scoreIncrement: number
}
