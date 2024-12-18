import { ValidationPipe } from '@nestjs/common'

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // TODO adjust to valid values in production
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.SERVER_PORT ?? 3003)
}
bootstrap()
