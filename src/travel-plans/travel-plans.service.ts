import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CountriesService } from '../countries/countries.service';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { TravelPlan } from './entities/travel-plan.entity';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectModel(TravelPlan.name)
    private travelPlanModel: Model<TravelPlan>,
    // Modelo Mongo TravelPlan.

    private readonly countriesService: CountriesService,
    // Servicio de países.
  ) {}

  async create(dto: CreateTravelPlanDto) {
    await this.countriesService.findOrCreateCountry(dto.countryCode);
    // Verifica caché país antes de guardar.

    return this.travelPlanModel.create(dto);
    // Crea travel plan.
  }

  async findAll() {
    return this.travelPlanModel.find();
    // Retorna todos los planes.
  }

  async findOne(id: string) {
    return this.travelPlanModel.findById(id);
    // Busca plan por id.
  }

  async remove(id: string) {
    return this.travelPlanModel.findByIdAndDelete(id);
    // Elimina plan.
  }
}
