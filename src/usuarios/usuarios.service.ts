import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './entities/usuario.entity';
import { Model } from 'mongoose';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name)
    private usuarioModel: Model<Usuario>,
  ) {}

  async create(dto: CreateUsuarioDto) {
    return this.usuarioModel.create({ ...dto });
  }

  async findOne(id: string) {
    return this.usuarioModel.findById(id);
    // Busca usuario por id.
  }

  async findAll() {
    return this.usuarioModel.find();
    // Busca todos os usuarios.
  }
}
