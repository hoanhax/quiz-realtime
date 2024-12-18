import { Module } from '@nestjs/common'
import { KafkaConsumerService } from './consumer.service'

@Module({
  providers: [KafkaConsumerService],
  exports: [KafkaConsumerService],
})
export class KafkaModule {}
