import { Field, InputType } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'

@InputType()
export class AnswerQuizInput {
  @Field()
  @MaxLength(40)
  quizId: string

  @Field()
  @MaxLength(40)
  userId: string

  @Field()
  @MaxLength(40)
  questionId: string

  @Field()
  @MaxLength(100)
  answer: string
}
