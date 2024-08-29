import { NestFactory } from '@nestjs/core';
import { PokedexApiModule } from './pokedex-api.module';

async function bootstrap() {
  const app = await NestFactory.create(PokedexApiModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}

bootstrap();
