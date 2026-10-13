import React from 'react';
import { Timer, CalendarDays, User } from 'lucide-react';
import { CustomCard } from '@/components/custom_card/CustomCard';
import type { Project } from '../../types/project.types';

interface ProjectListProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects, onProjectClick }) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(`${dateString}T00:00:00Z`);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(date);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => {
        // Cálculo del promedio para el avance general
        const generalProgress = Math.round(
          (project.pct_levantamiento + project.pct_progreso + project.pct_implementacion) / 3
        );

        // Construcción de los badges personalizados para este proyecto
        const customBadges = [
          <div
            key="area"
            className="inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold text-foreground text-[11px]"
          >
            <span
              className="mr-1 inline-block size-2 rounded-full"
              style={{ backgroundColor: project.area?.color }}
            ></span>
            {project.area?.nombre}
          </div>,
          <div
            key="type"
            className="inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold text-foreground text-[11px] uppercase"
          >
            {project.tipo}
          </div>,
          <div
            key="priority"
            className="inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold text-foreground text-[11px] capitalize"
          >
            Prioridad {project.prioridad}
          </div>,
        ];

        // Fases para la barra de progreso fraccionada
        const phasesData = [
          { label: 'Levant.', percentage: project.pct_levantamiento },
          { label: 'Progreso', percentage: project.pct_progreso },
          { label: 'Impl.', percentage: project.pct_implementacion },
        ];

        // Metadatos (Semanas y Fecha)
        const metadataItems = [
          project.semanas_estimadas && (
            <span key="time" className="inline-flex items-center gap-1">
              <Timer className="size-3" aria-hidden="true" /> {project.semanas_estimadas} sem
            </span>
          ),
          project.fecha_entrega && (
            <span key="date" className="inline-flex items-center gap-1">
              <CalendarDays className="size-3" aria-hidden="true" /> {formatDate(project.fecha_entrega)}
            </span>
          ),
        ].filter(Boolean);

        // Pie de tarjeta (Líder)
        const footer = (
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1 truncate">
              <User className="size-3 shrink-0" aria-hidden="true" />
              <span className="truncate">{project.lider}</span>
            </span>
          </div>
        );

        return (
          <CustomCard
            key={project.id}
            title={project.nombre}
            statusText={project.estado}
            badges={customBadges}
            description={project.descripcion}
            generalProgress={generalProgress}
            phases={phasesData}
            metadata={metadataItems}
            footerContent={footer}
            onClick={() => onProjectClick?.(project)}
          />
        );
      })}
    </div>
  );
};