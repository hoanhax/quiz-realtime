import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { MODULE_NAMES } from '../share/enums/module-name.enum'

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: MODULE_NAMES.KAFKA_CLIENT,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get<string>('kafka.clientId'),
              brokers: configService.get<string>('kafka.host').split(','), // Access configuration dynamically
            },
            consumer: {
              groupId: configService.get<string>('kafka.consumer'),
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [ClientsModule], // Export for reuse in other modules
})
export class KafkaClientModule {}
