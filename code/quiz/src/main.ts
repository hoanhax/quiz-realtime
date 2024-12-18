import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.get('/health', (req, res) => {
  //   res.status(200).send('OK')
  // })

  await app.listen(process.env.SERVER_PORT ?? 3001)
}
bootstrap()
