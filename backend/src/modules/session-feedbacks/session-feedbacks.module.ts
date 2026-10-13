import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionFeedbacksController } from './session-feedbacks.controller';
import { SessionFeedbacksService } from './session-feedbacks.service';
import { ProjectComment } from '../projects/entities/project-comment.entity';
import { Project } from '../projects/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectComment, Project])],
  controllers: [SessionFeedbacksController],
  providers: [SessionFeedbacksService],
  exports: [SessionFeedbacksService],
})
export class SessionFeedbacksModule {}