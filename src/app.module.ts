// src/app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// Importa el decorador @Module de NestJS.
// Este decorador sirve para definir módulos.

import { MongooseModule } from '@nestjs/mongoose';
// Importa el módulo de Mongoose.
// Permite conectar NestJS con MongoDB.

import { CountriesModule } from './countries/countries.module';
// Importa el módulo Countries.
// Contiene la lógica de países y caché.

import { TravelPlansModule } from './travel-plans/travel-plans.module';
import { UsuariosModule } from './usuarios/usuarios.module';
// Importa el módulo público de planes de viaje.

import { AuditMiddleware } from './middleware/audit.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:secret@localhost:27017/preparcial?authSource=admin',
    ),
    // Crea conexión global con MongoDB.
    // root = usuario
    // secret = contraseña
    // localhost = servidor local
    // 27017 = puerto de Mongo
    // preparcial = nombre de la base de datos
    // authSource=admin = autenticar usando DB admin

    CountriesModule,
    // Registra el módulo Countries dentro de la app.

    TravelPlansModule,
    UsuariosModule,
    // Registra el módulo TravelPlans.
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuditMiddleware).forRoutes('travel-plans', 'usuarios');
  }
}
// Módulo principal de toda la aplicación.
// Aquí NestJS conecta todos los módulos.

//Crea una conexión única a MongoDB al iniciar la aplicación.
//El parámetro authSource=admin indica que las credenciales (root:secret)
//pertenecen a la base de administración de Mongo.
//Establecemos una conexión con el servidor MongoDB (por defecto en el puerto 27017).
//Se autentica con usuario y contraseña (root / secret)
//Crea un módulo global que permite usar esa conexión en cualquier parte del proyecto
