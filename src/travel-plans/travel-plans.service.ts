import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CountriesService } from '../countries/countries.service';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { TravelPlan } from './entities/travel-plan.entity';
import { CreateExpensesDto } from './dto/create-expenses.dto';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectModel(TravelPlan.name)
    private travelPlanModel: Model<TravelPlan>,
    // Modelo Mongo TravelPlan.

    private readonly countriesService: CountriesService,
    // Servicio de países.

    private readonly usuariosService: UsuariosService,
    // Servicio de usuarios.
  ) {}

  async create(dto: CreateTravelPlanDto) {
    await this.countriesService.findOrCreateCountry(dto.countryCode);
    // Verifica caché país antes de guardar.

    const usuario = await this.usuariosService.findOne(dto.userId);

    if (!usuario) {
      throw new NotFoundException('User not found');
    }

    return this.travelPlanModel.create({ ...dto });
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

  async createExpense(id: string, dto: CreateExpensesDto) {
    const travelPlan = await this.travelPlanModel.findById(id);

    if (!travelPlan) {
      throw new Error('Travel plan not found');
      // Maneja error si no existe el plan.
    }
    travelPlan.expenses.push(dto);
    // Agrega gasto al plan.
    return travelPlan.save();
  }
}
