import { Injectable, OnApplicationShutdown } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs'

/**
 * Define service to consume message from Kafka
 */
@Injectable()
export class KafkaConsumerService implements OnApplicationShutdown {
  constructor(private readonly configService: ConfigService) {}
  private readonly kafka = new Kafka({
    brokers: this.configService.get<string>('kafka.host').split(','),
  })

  // We can support multiples consumer for diference topic
  private readonly consumers: Consumer[] = []

  /**
   * Consume message from Kafka base on topic
   *
   * @param topics ConsumerSubscribeTopics topics to consume
   * @param config ConsumerRunConfig Configuration for consumer
   */
  async consume(topics: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({
      groupId: this.configService.get<string>('kafka.consumerGroup'),
    })
    await consumer.connect()
    await consumer.subscribe(topics)
    await consumer.run(config)
    this.consumers.push(consumer)
  }

  async onApplicationShutdown() {
    // Disconnect consumer from Kafka
    for (const consumer of this.consumers) {
      await consumer.disconnect()
    }
  }
}
