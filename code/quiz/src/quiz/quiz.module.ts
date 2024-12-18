import { Module } from '@nestjs/common'
import { KafkaClientModule } from 'src/kafkaclient/kafka-client.module'

import { QuizService } from './quiz.service'
import { QuizResolver } from './quiz.resolver'

@Module({
  imports: [KafkaClientModule],
  providers: [QuizResolver, QuizService],
})
export class QuizModule {}
