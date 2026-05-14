import { Module } from '@nestjs/common';
// Decorador módulo.

import { MongooseModule } from '@nestjs/mongoose';
// Módulo Mongo.

import { HttpModule } from '@nestjs/axios';
// Módulo HTTP.

import { CountriesService } from './countries.service';
// Servicio principal de países.

import { Country, CountrySchema } from './entities/country.entity';
// Entity y schema.

import { RestCountriesProvider } from './providers/rest-countries.provider';
// Provider externo.

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
    // Registra modelo Country en Mongo.
    HttpModule,
    // Permite hacer requests HTTP.
  ],
  providers: [CountriesService, RestCountriesProvider],
  // Servicios/proveedores disponibles dentro del módulo.
  exports: [CountriesService],
  // Exporta CountriesService para otros módulos.
})
export class CountriesModule {}
// Módulo interno de países.
