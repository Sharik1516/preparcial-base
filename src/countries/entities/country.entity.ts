import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// Decoradores y utilidades de Mongoose para crear schemas.

@Schema()
// Convierte la clase en un schema de Mongoose.
export class Country {
  @Prop({ required: true, unique: true })
  // Campo obligatorio y único.
  alpha3Code: string;
  // Código Alpha-3 del país (COL, USA, etc).

  @Prop()
  // Campo normal.
  name: string;
  // Nombre del país.

  @Prop()
  region: string;
  // Región geográfica.

  @Prop()
  capital: string;
  // Capital del país.

  @Prop()
  population: number;
  // Población del país.

  @Prop()
  flagUrl: string;
  // URL de la bandera del país.
}

export const CountrySchema = SchemaFactory.createForClass(Country);
// Genera el schema real que Mongo usará

//Schema – define la estructura del dato
//Define qué campos existen y de qué tipo son
//Puede incluir reglas: obligatorios, valores por defecto, etc
//No interactúa con la base de datos directamente
//@Schema() convierte la clase en un schema de Mongoose
//@Prop() define cada campo y sus reglas (required, default,etc.)
//SchemaFactory.createForClass() genera el schema real que usará el modelo