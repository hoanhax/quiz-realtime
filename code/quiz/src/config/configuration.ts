export default () => ({
  serverPort: parseInt(process.env.SERVER_PORT, 10) || 3000,
  kafka: {
    host: process.env.KAFKA_HOST || 'localhost:9093',
    clientId: process.env.KAFKA_CLIENT_ID || 'quiz',
  },
})
