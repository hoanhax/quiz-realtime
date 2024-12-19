import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'

import configuration from './config/configuration'
import { RedisModule } from './redis/redis.module'

import { LeaderboardModule } from './leaderboard/leaderboard.module'
import { KafkaModule } from './kafka/kafka.module'
import { SseModule } from './sse/sse.module'
import { HealthModule } from './health/health.module'

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      load: [configuration], // Load the custom configuration
      isGlobal: true, // Make the configuration globally available
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    RedisModule,
    KafkaModule,
    HealthModule,
    SseModule,
    LeaderboardModule,
  ],
})
export class AppModule {}
