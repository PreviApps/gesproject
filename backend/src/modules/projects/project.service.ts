import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { Project } from './entities/project.entity';
import { ProjectStatus } from './dtos/project.dto';
import { ProjectComment } from './entities/project-comment.entity';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: TypeOrmRepository<Project>,
    @InjectRepository(ProjectComment)
    private readonly commentRepository: TypeOrmRepository<ProjectComment>,
  ) {}

  // Crear un nuevo proyecto
  async create(createProjectDto: Partial<Project>): Promise<Project> {
    const project = this.projectRepository.create(createProjectDto);
    return await this.projectRepository.save(project);
  }

  // Obtener todos los proyectos con filtros opcionales
  async findAll(division?: string, status?: ProjectStatus): Promise<Project[]> {
    const query = this.projectRepository.createQueryBuilder('project')
      .leftJoinAndSelect('project.area', 'area'); // <--- ¡ESTO FALTABA! Hace el JOIN con la tabla areas

    if (division) {
      query.andWhere('project.division = :division', { division });
    }

    if (status) {
      query.andWhere('project.status = :status', { status });
    }

    return await query.getMany();
  }

  // Obtener un proyecto por ID
  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({ 
      where: { id },
      relations: {
        area: true,
        comments: true,
      }, // <--- Así TypeORM queda feliz con el tipado estricto
    });
    
    if (!project) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
    }
    return project;
  }

  // Actualizar un proyecto
  async update(id: string, updateData: Partial<Project>): Promise<Project> {
    await this.projectRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }

  // Agregar un comentario
  async addComment(projectId: string, commentDto: CreateCommentDto): Promise<Project> {
    await this.findOne(projectId);

    const comment = this.commentRepository.create({
      ...commentDto,
      projectId,
    });
    
    await this.commentRepository.save(comment);

    return this.findOne(projectId);
  }
}