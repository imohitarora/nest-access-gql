import type { INestApplication } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//import * as basicAuth from 'express-basic-auth';

export function setupSwagger(app: INestApplication, appPort: number | string) {
  const uri = 'api';
  const options = new DocumentBuilder()
    .setTitle('NestJS Example API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  // const docsPath = `/${uri}`;
  // app.use(
  //   docsPath,
  //   basicAuth({
  //     challenge: true,
  //     users: { admin: 'admin' },
  //   }),
  // );

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(uri, app, document);
  Logger.log(`Load API Documentation at http://localhost:${appPort}/${uri}`, 'Swagger');
}
