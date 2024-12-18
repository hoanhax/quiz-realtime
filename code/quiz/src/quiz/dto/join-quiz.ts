import { Field, InputType } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'

export class JoinQuizDto {
  @MaxLength(40)
  quizId: string

  @MaxLength(40)
  userId: string
}

@InputType()
export class JoinQuizInput extends JoinQuizDto {
  @Field()
  quizId: string

  @Field()
  userId: string
}
