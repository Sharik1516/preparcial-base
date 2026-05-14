import { IsString, IsNotEmpty, IsDateString, Length } from 'class-validator';
// Decoradores de validación

export class CreateTravelPlanDto {
  @IsString() //Debe ser una cadena de texto
  @IsNotEmpty() //No debe estar vacío
  title: string;

  @IsDateString() //Debe tener formato de fecha valido
  startDate: string;

  @IsDateString() //Debe tener formato de fecha valido
  endDate: string;

  @IsString() //Debe ser una cadena de texto
  @Length(3, 3) //Debe tener exactamente 3 caracteres
  countryCode: string;
}