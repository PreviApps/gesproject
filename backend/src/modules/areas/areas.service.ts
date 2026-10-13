import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { Area } from './entities/area.entity';
import { CreateAreaDto } from './dtos/create-area.dto';

@Injectable()
export class AreasService { // <-- ¡IMPORTANTE: Asegúrate de que tenga 'export'!
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: TypeOrmRepository<Area>,
  ) {}

  // Crear un área
  async create(createAreaDto: CreateAreaDto): Promise<Area> {
    try {
      const area = this.areaRepository.create(createAreaDto);
      return await this.areaRepository.save(area);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException(`El área con el nombre "${createAreaDto.nombre}" ya existe.`);
      }
      throw error;
    }
  }

  // Obtener todas las áreas (Formato de objeto para relations en TypeORM moderno)
  async findAll(): Promise<Area[]> {
    return await this.areaRepository.find({ relations: { projects: true } });
  }

  // Obtener un área por ID
  async findOne(id: string): Promise<Area> {
    const area = await this.areaRepository.findOne({ 
      where: { id }, 
      relations: { projects: true } // <-- Objeto en lugar de array
    });
    if (!area) {
      throw new NotFoundException(`Área con ID ${id} no encontrada`);
    }
    return area;
  }

  // Actualizar un área
  async update(id: string, updateData: Partial<Area>): Promise<Area> {
    await this.areaRepository.update(id, updateData);
    return this.findOne(id);
  }

  // Eliminar un área
  async remove(id: string): Promise<void> {
    const area = await this.findOne(id);
    await this.areaRepository.remove(area);
  }
}