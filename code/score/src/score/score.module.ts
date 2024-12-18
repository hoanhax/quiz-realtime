import { Module } from '@nestjs/common'
import { ScoreService } from './score.service'
import { ScoreController } from './score.controller'
import { KafkaClientModule } from 'src/kafkaclient/kafka-client.module'
import { RedisModule } from 'src/redis/redis.module'

@Module({
  imports: [RedisModule, KafkaClientModule],
  controllers: [ScoreController],
  providers: [ScoreService],
  exports: [],
})
export class ScoreModule {}
