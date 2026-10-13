import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectComment } from './entities/project-comment.entity';
import { ProjectController } from './project.controller';
import { ProjectsService } from './project.service'; // Si está en la misma carpeta que el módulo
import { Area } from '../areas/entities/area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectComment, Area])],
  controllers: [ProjectController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}