import { IsString, IsOptional, IsEnum, IsNumber, IsArray, IsDateString, Min, Max } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  nombre!: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  observacion?: string;

  @IsEnum(['EN DESARROLLO', 'PENDIENTE', 'FINALIZADO'])
  estado!: string;

  @IsEnum(['baja', 'media', 'alta', 'urgente'])
  prioridad!: string;

  @IsString()
  @IsOptional()
  areaId?: string;

  @IsString()
  lider!: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  integrantes?: string[];

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  servidor?: string;

  @IsEnum(['INTERNO', 'EXTERNO'])
  tipo!: string;

  @IsNumber()
  @IsOptional()
  semanasEstimadas?: number;

  @IsDateString()
  @IsOptional()
  fechaEntrega?: string;

  @IsNumber()
  @Min(0) @Max(100)
  @IsOptional()
  pctLevantamiento?: number;

  @IsNumber()
  @Min(0) @Max(100)
  @IsOptional()
  pctProgreso?: number;

  @IsNumber()
  @Min(0) @Max(100)
  @IsOptional()
  pctImplementacion?: number;
}