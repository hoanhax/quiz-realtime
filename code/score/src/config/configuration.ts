export default () => ({
  serverPort: parseInt(process.env.SERVER_PORT, 10) || 3002,
  kafka: {
    host: process.env.KAFKA_HOST || 'localhost:9093',
    clientId: process.env.KAFKA_CLIENT_ID || 'score',
    consumer: process.env.KAFKA_CONSUMER || 'score_consumer',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
})
