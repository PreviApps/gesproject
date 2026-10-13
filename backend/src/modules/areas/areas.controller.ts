import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateAreaDto } from './dtos/create-area.dto';
import { Area } from './entities/area.entity';
import { AreasService } from './areas.service';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get()
  findAll(): Promise<Area[]> {
    return this.areasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Area> {
    return this.areasService.findOne(id);
  }

  @Post('create')
  create(@Body() createAreaDto: CreateAreaDto): Promise<Area> {
    return this.areasService.create(createAreaDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<Area>,
  ): Promise<Area> {
    return this.areasService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.areasService.remove(id);
  }
}