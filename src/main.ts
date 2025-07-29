import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
    .setTitle('Sara bolsas')
    .setDescription('Documentação sara bolsas')
    .setVersion('1.0')
    .build()
    ;

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT ?? 3000);
  console.log(`API AVAILABLE IN ${process.env.URL}`)
  console.log(`DOCS AVAILABLE IN ${process.env.URL}/api/docs`)
}
bootstrap();
