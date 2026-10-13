export const ProjectStatus = {
  EN_DESARROLLO: 'EN DESARROLLO',
  PENDIENTE: 'PENDIENTE',
  FINALIZADO: 'FINALIZADO',
} as const;

export type ProjectStatus = typeof ProjectStatus[keyof typeof ProjectStatus];

export const ProjectPriority = {
  BAJA: 'baja',
  MEDIA: 'media',
  ALTA: 'alta',
  URGENTE: 'urgente',
} as const;

export type ProjectPriority = typeof ProjectPriority[keyof typeof ProjectPriority];

export interface ProjectComment {
  id: string;
  project_id?: string;
  user_id?: string;
  user_name: string;      // Coincide con 'autor' si lo mapeas, o el nombre del usuario
  content: string;        // El texto del comentario
  type?: 'COMENTARIO' | 'DECISION' | 'SOLICITUD';
  created_at: string;
}

export interface SessionFeedback {
  id: string;
  projectId?: string;
  proyecto: string;
  autor: string;
  categoria: string;
  comentario: string;
  created_at: string;
}

export interface Area {
  id: string;
  nombre: string;
  color: string;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  nombre: string;                  // Antes 'name'
  descripcion: string;             // Antes 'description'
  observacion?: string | null;     // Nuevo campo clave
  estado: ProjectStatus | string;  // Acepta los estados definidos o strings libres
  prioridad: ProjectPriority | string; // Acepta minúsculas/mayúsculas
  area_id: string | null;
  lider: string;                   // Antes 'project_leaders' (ahora es un string directo)
  integrantes: string[];           // Antes 'integrants'
  url?: string | null;
  servidor?: string | null;        // Antes 'server_host'
  tipo: 'INTERNO' | 'EXTERNO' | string;
  semanas_estimadas?: number | null; // Antes 'estimated_development_time'
  fecha_entrega?: string | null;   // Antes 'estimated_delivery_date'
  pct_levantamiento: number;       // Antes 'survey_percentage'
  pct_progreso: number;            // Antes 'progress_percentage'
  pct_implementacion: number;      // Antes 'implementation_percentage'
  comments?: ProjectComment[];     // Opcional por si no viene en el backend principal
  created_at: string;
  updated_at: string;
  area: Area | null;
}

export type CreateProjectInput = Partial<Project>;