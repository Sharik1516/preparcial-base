import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
// Decoradores de validación

export class CreateExpensesDto {
  @IsString() //Debe ser una cadena de texto
  @IsNotEmpty() //No debe estar vacío
  description: string;

  @IsNumber() //Debe ser un número
  amount: number;

  @IsString() //Debe ser una cadena de texto
  @IsNotEmpty() //No debe estar vacío
  category: string;
}
