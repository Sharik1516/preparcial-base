import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class TravelPlan {

  @Prop({ required: true })
  title: string;
  //El título del plan de viaje, obligatorio

  @Prop({ required: true })
  startDate: Date;
  //La fecha de inicio del plan de viaje, obligatoria

  @Prop({ required: true })
  endDate: Date;
  //La fecha de finalización del plan de viaje, obligatoria

  @Prop({ required: true })
  countryCode: string;
  //El código del país de destino, obligatorio
}

export const TravelPlanSchema = SchemaFactory.createForClass(TravelPlan);
// Genera el schema Mongo

//Schema – define la estructura del dato
//Define qué campos existen y de qué tipo son
//Puede incluir reglas: obligatorios, valores por defecto, etc
//No interactúa con la base de datos directamente
//@Schema() convierte la clase en un schema de Mongoose
//@Prop() define cada campo y sus reglas (required, default,etc.)
//SchemaFactory.createForClass() genera el schema real que usará el modelo