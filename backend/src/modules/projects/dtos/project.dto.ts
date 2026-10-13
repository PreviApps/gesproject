export interface Project {
	id: string;
	details: ProjectDetails;
	status: ProjectStatus;
	priority: ProjectPriority;
	estimated_development_time: number;
	project_leaders: string[];
	integrants: string[];
	division: string;
	progress: ProjectProgress;
	estimated_delivery_date: Date;
}

interface ProjectProgress {
  survey_percentage: number;       // % de levantamiento
  progress_percentage: number;     // % de progreso
  implementation_percentage: number; // % de implementación
}

interface ProjectDetails{
	name: string;
	description: string;
	url?: string;
	server_host?: string;
}

export enum ProjectStatus {
  EN_DESARROLLO = 'EN DESARROLLO',
  PENDIENTE = 'PENDIENTE',
  FINALIZADO = 'FINALIZADO'
}

export enum ProjectPriority {
  BAJA = 'BAJA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  URGENTE = 'URGENTE'
}