import type { SessionFeedback } from '../types/project.types';

const API_URL = import.meta.env.API_URL_BASE || 'http://localhost:3000';

function mapBackendCommentToFrontend(item: any): SessionFeedback {
    return {
        id: item.id,
        // Aquí extraemos el nombre del proyecto priorizando si el backend manda la relación 'project' con 'nombre' o 'name'
        proyecto: item.project?.nombre || item.project?.name || item.projectName || item.proyecto || 'Proyecto General',
        autor: item.userName || item.user_name || item.autor || 'Desconocido',
        categoria: item.type || item.categoria || 'Comentario',
        comentario: item.content || item.observacion || item.comentario || '',
        created_at: item.createdAt || item.created_at || new Date().toISOString(),
    };
}

// Obtener comentarios filtrando por projectId opcional
export async function getProjectComments(projectId?: string): Promise<SessionFeedback[]> {
    const url = projectId 
        ? `${API_URL}/session-feedbacks?projectId=${projectId}` 
        : `${API_URL}/session-feedbacks`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Error al obtener los comentarios del proyecto');
    }
    const data = await response.json();
    return data.map(mapBackendCommentToFrontend);
}

// Crear un comentario
export async function createProjectComment(
    commentData: { projectId: string; autor: string; categoria: string; observacion: string }
): Promise<SessionFeedback> {
    const payload = {
        projectId: commentData.projectId,
        userName: commentData.autor,
        type: commentData.categoria.toUpperCase(),
        content: commentData.observacion,
    };

    const response = await fetch(`${API_URL}/session-feedbacks/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('No se pudo guardar el comentario');
    }

    const newComment = await response.json();
    return mapBackendCommentToFrontend(newComment);
}

// Eliminar comentario
export async function deleteProjectComment(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/session-feedbacks/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('No se pudo eliminar el comentario');
    }
}