import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { SessionFeedbacksService } from './session-feedbacks.service';
import { CreateSessionFeedbackDto } from './dtos/create-session-feedback.dto';
import { ProjectComment } from '../projects/entities/project-comment.entity';

@Controller('session-feedbacks')
export class SessionFeedbacksController {
  constructor(private readonly sessionFeedbacksService: SessionFeedbacksService) {}

  // Endpoint para el muro general de feedbacks (o filtrado opcional por query ?projectId=...)
  @Get()
  findAll(@Query('projectId') projectId?: string): Promise<ProjectComment[]> {
    if (projectId) {
      return this.sessionFeedbacksService.findByProject(projectId);
    }
    return this.sessionFeedbacksService.findAllGlobal();
  }

  // Endpoint para crear un feedback
  @Post('create')
  create(@Body() createDto: CreateSessionFeedbackDto): Promise<ProjectComment> {
    return this.sessionFeedbacksService.create(createDto);
  }

  // Endpoint para eliminar un comentario si se requiere
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.sessionFeedbacksService.remove(id);
  }
}