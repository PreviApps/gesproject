import { useState } from 'react';
import type { Project } from '../types/project.types';

export function useProjectFilters(projects: Project[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('TODOS');
  const [selectedArea, setSelectedArea] = useState('TODAS');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.lider && project.lider.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesArea = selectedArea === 'TODAS' || project.area_id === selectedArea;

    let matchesFilter = true;
    // Nota: en tus mocks tienes "EN DESARROLLO", asegúrate de alinearlo con tu botón 'DESARROLLO'
    if (selectedFilter === 'FINALIZADO') matchesFilter = project.estado === 'FINALIZADO';
    if (selectedFilter === 'DESARROLLO') matchesFilter = project.estado === 'EN DESARROLLO' || project.estado === 'DESARROLLO';
    if (selectedFilter === 'PENDIENTE') matchesFilter = project.estado === 'PENDIENTE';
    if (selectedFilter === 'PRIORIDAD_ALTA') matchesFilter = project.prioridad === 'alta';

    return matchesSearch && matchesArea && matchesFilter;
  });

  return {
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    selectedArea,
    setSelectedArea,
    filteredProjects,
  };
}