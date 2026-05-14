import { Injectable } from '@nestjs/common';
// Permite inyección.

import { InjectModel } from '@nestjs/mongoose';
// Permite inyectar modelos Mongo.

import { Model } from 'mongoose';
// Tipo Model de Mongoose.

import { Country } from './entities/country.entity';
// Entity Country.

import { RestCountriesProvider } from './providers/rest-countries.provider';
// Provider externo.

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name)
    private countryModel: Model<Country>,
    // Inyecta modelo Country.
    private readonly restCountriesProvider: RestCountriesProvider,
    // Inyecta provider externo.
  ) {}

  async findOrCreateCountry(code: string) {
    //Busca en la base de datos un país con el código proporcionado
    //¿Existe? Devuelve el país encontrado
    //¿No existe? Llama a la API externa para obtener los datos del país
    //Crea un nuevo documento en la base de datos con los datos obtenidos
    //Devuelve el nuevo país creado
    const existingCountry = await this.countryModel.findOne({
      alpha3Code: code,
    });
    // Busca país en MongoDB.

    if (existingCountry) {
      return existingCountry;
    }
    // Si existe, devuelve caché local.

    const apiCountry = await this.restCountriesProvider.getCountryByCode(code);
    // Si no existe, consulta API externa.

    const newCountry = await this.countryModel.create({
      alpha3Code: apiCountry.cca3,
      // Código Alpha-3.
      name: apiCountry.name.common,
      // Nombre.
      region: apiCountry.region,
      // Región.
      capital: apiCountry.capital?.[0],
      // Capital (si existe).
      population: apiCountry.population,
      // Población.
      flagUrl: apiCountry.flags.png,
      // URL de la bandera.
    });

    return newCountry;
    // Devuelve nuevo país guardado.
  }
}

//Es la clase generada a partir del schema
//Representa una colección en MongoDB
//Expone métodos CRUD: .create(), .find(), .update(), .delete()
//Aplica las reglas de validación del schema
//Devuelve documentos (instancias reales de los datos).
//@InjectModel(Task.name) busca en el contenedor el token 'TaskModel'. 
//NestJS encuentra el modelo que registraste con forFeature.
