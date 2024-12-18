import { IntrospectAndCompose } from '@apollo/gateway'
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {},
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'quiz',
              url: process.env.QUIZ_SERVICE || 'http://localhost:3001/graphql',
            },
            {
              name: 'leaderboard',
              url: process.env.LEADERBOARD_SERVICE || 'http://localhost:3003/graphql',
            },
          ],
        }),
      },
    }),
  ],
})
export class AppModule {}
