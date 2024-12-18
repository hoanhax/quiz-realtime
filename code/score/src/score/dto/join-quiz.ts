import { MaxLength } from 'class-validator'

export class JoinQuizDto {
  @MaxLength(40)
  quizId: string

  @MaxLength(40)
  userId: string
}
