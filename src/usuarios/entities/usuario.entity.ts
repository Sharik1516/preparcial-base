import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Usuario {
  @Prop({ required: true })
  userId: string;
  //El ID del usuario, obligatorio

  @Prop({ required: true })
  name: string;
  //El nombre del usuario, obligatorio

  @Prop({ required: true })
  email: string;
  //El correo electrónico del usuario, obligatorio
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
