import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post } from '@nestjs/common';
import { TravelPlansService } from './travel-plans.service';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { CreateExpensesDto } from './dto/create-expenses.dto';

@Controller('travel-plans')
// Todas las rutas empiezan con /travel-plans
export class TravelPlansController {
  constructor(private readonly travelPlansService: TravelPlansService) {}
  // Inyecta servicio.

  @Post()
  // Endpoint POST /travel-plans
  create(@Body() dto: CreateTravelPlanDto) {
    return this.travelPlansService.create(dto);
    // Delega creación al servicio
  }

  @Get()
  // Endpoint GET /travel-plans
  findAll() {
    return this.travelPlansService.findAll();
    // Retorna todos
  }

  @Get(':id')
  // Endpoint GET /travel-plans/:id
  findOne(@Param('id') id: string) {
    return this.travelPlansService.findOne(id);
    // Busca por id
  }

  @Delete(':id')
  // Endpoint DELETE /travel-plans/:id
  remove(@Param('id') id: string) {
    return this.travelPlansService.remove(id);
    // Elimina plan
  }

  @Post(':id/expenses')
  // Endpoint POST /travel-plans/:id/expenses
  createExpense(@Param('id') id: string, @Body() dto: CreateExpensesDto) {
    return this.travelPlansService.createExpense(id, dto);
  }
}
