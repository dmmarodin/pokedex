import { NestFactory } from '@nestjs/core';
import { PokedexApiModule } from './pokedex-api.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(PokedexApiModule);
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get("FRONTEND_URL") || 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = configService.get('PORT') || 3000;
  await app.listen(port);
}

bootstrap();
