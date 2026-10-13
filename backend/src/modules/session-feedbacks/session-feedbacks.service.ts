import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { ProjectComment } from '../projects/entities/project-comment.entity'; // Ajusta la ruta a tu entidad de comentarios
import { CreateSessionFeedbackDto } from './dtos/create-session-feedback.dto';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class SessionFeedbacksService {
  constructor(
    @InjectRepository(ProjectComment)
    private readonly commentRepository: TypeOrmRepository<ProjectComment>,
    @InjectRepository(Project)
    private readonly projectRepository: TypeOrmRepository<Project>,
  ) {}

  // 1. Obtener TODOS los feedbacks de la plataforma (para el feedback general)
  async findAllGlobal(): Promise<ProjectComment[]> {
    return await this.commentRepository.find({
      relations: {
        project: true, // Trae la info del proyecto vinculado para mostrar su nombre en el muro general
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // 2. Obtener los feedbacks filtrados por un proyecto específico
  async findByProject(projectId: string): Promise<ProjectComment[]> {
    // Validamos primero si el proyecto existe
    const project = await this.projectRepository.findOne({ where: { id: projectId } });
    if (!project) {
      throw new NotFoundException(`Proyecto con ID ${projectId} no encontrado`);
    }

    return await this.commentRepository.find({
      where: { projectId },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // 3. Crear un nuevo feedback / comentario
  async create(createDto: CreateSessionFeedbackDto): Promise<ProjectComment> {
    const project = await this.projectRepository.findOne({ where: { id: createDto.projectId } });
    if (!project) {
      throw new NotFoundException(`Proyecto con ID ${createDto.projectId} no encontrado`);
    }

    const comment = this.commentRepository.create(createDto);
    return await this.commentRepository.save(comment);
  }

  // 4. Eliminar un feedback por su ID
  async remove(id: string): Promise<void> {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Feedback con ID ${id} no encontrado`);
    }
  }
}