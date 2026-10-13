import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsOptional()
  color?: string;
}