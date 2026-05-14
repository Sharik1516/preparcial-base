import { Injectable } from '@nestjs/common';
// Permite que Nest inyecte esta clase.

import { HttpService } from '@nestjs/axios';
// Servicio HTTP de NestJS basado en Axios.

import { firstValueFrom } from 'rxjs';
// Convierte Observable en Promise.

@Injectable()
// Marca esta clase como provider inyectable.
export class RestCountriesProvider {
  constructor(private readonly httpService: HttpService) {}
  // Inyecta HttpService.

  async getCountryByCode(code: string) {
    // Método async para buscar país.
    const response = await firstValueFrom(
      this.httpService.get(`https://restcountries.com/v3.1/alpha/${code}`),
    );
    // Hace request HTTP a RestCountries API.

    return response.data[0];
    // Devuelve el primer resultado.
  }
}
