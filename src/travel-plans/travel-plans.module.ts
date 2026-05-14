import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TravelPlansService } from './travel-plans.service';
import { TravelPlansController } from './travel-plans.controller';

import { TravelPlan, TravelPlanSchema } from './entities/travel-plan.entity';

import { CountriesModule } from '../countries/countries.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TravelPlan.name,
        schema: TravelPlanSchema,
      },
    ]),
    // Registra modelo TravelPlan.
    CountriesModule,
    // Importa CountriesModule.
  ],
  providers: [TravelPlansService],
  // Servicio lógica negocio.
  controllers: [TravelPlansController],
  // Controller HTTP.
})
export class TravelPlansModule {}
