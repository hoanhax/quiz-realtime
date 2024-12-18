import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { KafkaConsumerService } from '../kafka/consumer.service'
import { EventEmitter2 } from '@nestjs/event-emitter'

import { KAFKA_TOPICS } from '../share/enums/kafka-topic.enum'
import { EMITER_EVENTS } from 'src/share/enums/emiter-event.enum'

@Injectable()
export class LeaderboardConsumer implements OnModuleInit {
  private readonly logger = new Logger(LeaderboardConsumer.name)

  constructor(
    private readonly kafkaConsumerService: KafkaConsumerService,
    private eventEmitter: EventEmitter2,
  ) {}

  async onModuleInit() {
    try {
      /**
       * consume message from Kafka for topic SCORE_SYNCED
       * For each mesage received, emit event to SSE controller
       */
      await this.kafkaConsumerService.consume(
        { topics: [KAFKA_TOPICS.SCORE_SYNCED] },
        {
          eachMessage: async ({ message }) => {
            const value = message?.value.toString()
            const jsonValue = JSON.parse(value)

            // Emit event to SSE controller
            this.eventEmitter.emit(EMITER_EVENTS.SCORE_EVENT, jsonValue)
          },
        },
      )
    } catch (error) {
      this.logger.error('Error initializing Kafka consumer', error)
    }
  }
}
