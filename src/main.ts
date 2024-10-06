import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as dotenv from 'dotenv';

const envFilePath = `.env.${process.env.NODE_ENV || 'dev'}`;
dotenv.config({ path: envFilePath });
// dotenv.config({ path: '.env.dev' });

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost'],
  })

  await app.listen(3000);
}
bootstrap();
