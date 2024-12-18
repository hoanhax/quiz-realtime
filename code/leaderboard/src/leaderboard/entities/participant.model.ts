import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Participant {
  @Field(() => Int)
  position: number

  @Field({ nullable: false })
  userId: string

  @Field(() => Int)
  score: number
}
