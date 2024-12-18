import { Module } from '@nestjs/common'
import { LeaderboardService } from './leaderboard.service'
import { LeaderboardResolver } from './leaderboard.resolver'
import { LeaderboardConsumer } from './leaderboard.consumer'
import { KafkaModule } from 'src/kafka/kafka.module'
import { RedisModule } from 'src/redis/redis.module'

@Module({
  imports: [RedisModule, KafkaModule],
  providers: [LeaderboardResolver, LeaderboardService, LeaderboardConsumer],
})
export class LeaderboardModule {}
