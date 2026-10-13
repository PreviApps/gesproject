import { useMemo } from 'react';
import type { Project } from '../types/project.types';

export function useProjectStats(projects: Project[]) {
  return useMemo(() => {
    const totalProjects = projects.length;
    const completedProjects = projects.filter((p) => p.estado === 'FINALIZADO').length;
    
    // Ajusta según los valores reales que maneje tu estado 'estado' (ej. 'EN_DESARROLLO' o 'DESARROLLO')
    const inProgressProjects = projects.filter(
      (p) => p.estado === 'EN DESARROLLO' || p.estado === 'DESARROLLO'
    ).length;
    
    const pendingProjects = projects.filter((p) => p.estado === 'PENDIENTE').length;
    const highPriorityProjects = projects.filter((p) => p.prioridad === 'alta').length;

    // Cálculo del promedio de avance (puedes usar pct_progreso o promediar varias métricas si lo prefieres)
    const averageProgressValue = totalProjects > 0
      ? Math.round(projects.reduce((acc, p) => acc + (p.pct_progreso || 0), 0) / totalProjects)
      : 0;
    
    const averageProgress = `${averageProgressValue}%`;

    return {
      totalProjects,
      completedProjects,
      inProgressProjects,
      pendingProjects,
      highPriorityProjects,
      averageProgress,
    };
  }, [projects]);
}