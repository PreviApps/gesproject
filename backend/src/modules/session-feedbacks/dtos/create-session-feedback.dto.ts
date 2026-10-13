import { IsString, IsEnum, IsOptional, IsUUID } from 'class-validator';

export class CreateSessionFeedbackDto {
  @IsUUID()
  projectId!: string; // El ID del proyecto al que pertenece este feedback

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  userName!: string;

  @IsString()
  content!: string;

  @IsEnum(['COMENTARIO', 'DECISION', 'SOLICITUD', 'BLOQUEO', 'AVANCE'])
  @IsOptional()
  type?: string;
}