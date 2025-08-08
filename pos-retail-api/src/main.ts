import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // 👇 Tell Nest to use the Express platform
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 👇 Serve static files from the "public" folder
  app.useStaticAssets(join(__dirname, '..', 'public'));

  const config = new DocumentBuilder()
    .setTitle('POS Retail API Documentation')
    .setDescription('API documentation ---- for the POS Retail system')
    .setVersion('2.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // CORS setup (allow all origins for now)
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(4000, '0.0.0.0');
}
bootstrap();
