import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
// Decoradores de validación

export class CreateExpensesDto {
  @IsString() //Debe ser una cadena de texto
  @IsNotEmpty() //No debe estar vacío
  description: string;

  @IsNumber() //Debe ser un número
  @IsPositive() //Debe ser un número positivo
  amount: number;

  @IsString() //Debe ser una cadena de texto
  @IsNotEmpty() //No debe estar vacío
  category: string;
}
