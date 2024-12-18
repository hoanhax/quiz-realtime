export default () => ({
  serverPort: parseInt(process.env.SERVER_PORT, 10) || 3003,
  // Configuration for Kafka
  kafka: {
    host: process.env.KAFKA_HOST || 'localhost:9093',
    clientName: process.env.KAFKA_CLIENT_NAME || 'KAFKA_CLIENT',
    clientId: process.env.KAFKA_CLIENT_ID || 'leaderboard',
    consumerGroup: process.env.KAFKA_CONSUME_GROUP || 'leaderboard-consume',
  },
  // Configuration for Redis
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
})
