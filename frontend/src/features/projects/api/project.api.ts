import type { Project, CreateProjectInput } from '../types/project.types';

const API_URL = import.meta.env.VITE_API_URL;

function mapBackendProjectToFrontend(item: any): Project {
    return {
        id: item.id,
        nombre: item.nombre,
        descripcion: item.descripcion,
        observacion: item.observacion || null,
        estado: item.estado,
        prioridad: item.prioridad,
        area_id: item.areaId || null,
        lider: item.lider,
        integrantes: item.integrantes || [],
        url: item.url || null,
        servidor: item.servidor || null,
        tipo: item.tipo,
        semanas_estimadas: item.semanasEstimadas ?? null,
        fecha_entrega: item.fechaEntrega || null,
        pct_levantamiento: item.pctLevantamiento ?? 0,
        pct_progreso: item.pctProgreso ?? 0,
        pct_implementacion: item.pctImplementacion ?? 0,
        created_at: item.createdAt,
        updated_at: item.updatedAt,
        area: item.area ? {
            id: item.area.id,
            nombre: item.area.nombre,
            color: item.area.color,
            created_at: item.area.createdAt,
            updated_at: item.area.updatedAt,
        } : null,
        comments: item.comments || [],
    };
}

function mapFrontendProjectToBackend(projectData: Partial<CreateProjectInput>) {
    return {
        nombre: projectData.nombre,
        descripcion: projectData.descripcion,
        observacion: projectData.observacion,
        estado: projectData.estado,
        prioridad: projectData.prioridad,
        areaId: projectData.area_id,
        lider: projectData.lider,
        integrantes: projectData.integrantes,
        url: projectData.url,
        servidor: projectData.servidor,
        tipo: projectData.tipo,
        semanasEstimadas: projectData.semanas_estimadas,
        fechaEntrega: projectData.fecha_entrega,
        pctLevantamiento: projectData.pct_levantamiento,
        pctProgreso: projectData.pct_progreso,
        pctImplementacion: projectData.pct_implementacion,
    };
}

export async function getProjects(): Promise<Project[]> {
    const response = await fetch(`${API_URL}/project`);
    if (!response.ok) throw new Error('Error al obtener los proyectos del servidor');
    const data = await response.json();
    return data.map(mapBackendProjectToFrontend);
}

export async function createProjectRequest(projectData: CreateProjectInput): Promise<Project> {
    const backendPayload = mapFrontendProjectToBackend(projectData);
    const response = await fetch(`${API_URL}/project/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backendPayload),
    });
    if (!response.ok) throw new Error('No se pudo crear el proyecto en el servidor');
    const newProject = await response.json();
    return mapBackendProjectToFrontend(newProject);
}

export async function updateProjectRequest(id: string, projectData: Partial<CreateProjectInput>): Promise<Project> {
    const backendPayload = mapFrontendProjectToBackend(projectData);
    const response = await fetch(`${API_URL}/project/${id}`, {
        method: 'PATCH', // O PATCH según configure tu backend en NestJS
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backendPayload),
    });
    if (!response.ok) throw new Error('No se pudo actualizar el proyecto en el servidor');
    const updatedProject = await response.json();
    return mapBackendProjectToFrontend(updatedProject);
}

export async function deleteProjectRequest(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/project/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('No se pudo eliminar el proyecto en el servidor');
}