import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  userName!: string;

  @IsString()
  content!: string;

  @IsEnum(['COMENTARIO', 'DECISION', 'SOLICITUD'])
  type!: string;
}