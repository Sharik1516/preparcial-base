import { NestFactory } from '@nestjs/core';
// Importa el factory que crea la aplicación NestJS.

import { ValidationPipe } from '@nestjs/common';
// Importa ValidationPipe.
// Sirve para validar automáticamente DTOs.

import { AppModule } from './app.module';
// Importa el módulo principal de la aplicación.

async function bootstrap() {
  // Función principal async que arranca el servidor.

  const app = await NestFactory.create(AppModule);
  // Crea la aplicación usando AppModule.

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //elimina campos extra
      // Elimina propiedades extra no definidas en DTO.

      forbidNonWhitelisted: true, //lanza error si mandan basura
      // Lanza error si llegan campos no permitidos.
      transform: true, //convierte tipos de datos automáticamente
    }),
  );
  await app.listen(3000);
  // Levanta servidor en puerto 3000.
}
bootstrap();
// Ejecuta la función principal.
