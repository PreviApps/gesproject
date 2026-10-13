import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateProjectDto } from "./dtos/create-project.dto";
import { CreateCommentDto } from "./dtos/create-comment.dto";
import { ProjectsService } from "./project.service";
import { ProjectStatus } from "./dtos/project.dto";
import { Project } from "./entities/project.entity";

@Controller('project')
export class ProjectController {

	constructor(private readonly projectsService: ProjectsService) { }

	@Get()
	findAll(
		@Query('division') division?: string,
		@Query('status') status?: ProjectStatus,
	): Promise<Project[]> {
		return this.projectsService.findAll(division, status);
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Project> {
		return this.projectsService.findOne(id);
	}

	@Post('create')
	create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
		return this.projectsService.create(createProjectDto as Partial<Project>);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateData: Partial<Project>,
	): Promise<Project> {
		return this.projectsService.update(id, updateData);
	}

	@Post(':id/comments')
	addComment(
		@Param('id') id: string,
		@Body() commentDto: CreateCommentDto,
	): Promise<Project> {
		return this.projectsService.addComment(id, commentDto);
	}

	@Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.projectsService.remove(id);
	}
}