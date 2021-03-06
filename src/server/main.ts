import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

(async function () {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT||80);
  console.log('http://localhost/')
})();
