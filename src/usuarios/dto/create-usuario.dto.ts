import { IsString, IsNotEmpty } from 'class-validator';
// Decoradores de validación

export class CreateUsuarioDto {
  @IsString() //Debe ser una cadena de texto
  @IsNotEmpty() //No debe estar vacío
  userId: string;

  @IsString() //Debe ser una cadena de texto
  @IsNotEmpty() //No debe estar vacío
  name: string;

  @IsString() //Debe ser una cadena de texto
  @IsNotEmpty() //No debe estar vacío
  email: string;
}
