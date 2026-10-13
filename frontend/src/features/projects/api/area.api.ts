import type { Area } from '../types/project.types'; // O tu archivo de tipos general

// Lee la URL base desde las variables de entorno de Vite
const API_URL = import.meta.env.VITE_API_URL;

// Obtener todas las áreas
export async function getAreas(): Promise<Area[]> {
    const response = await fetch(`${API_URL}/areas`);
    
    if (!response.ok) {
        throw new Error('Error al obtener las áreas del servidor');
    }

    return await response.json();
}

// Crear un área nueva
export async function createAreaRequest(areaData: Omit<Area, 'id'>): Promise<Area> {
    const response = await fetch(`${API_URL}/areas/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(areaData),
    });

    if (!response.ok) {
        throw new Error('No se pudo crear el área en el servidor');
    }

    return await response.json();
}

// Actualizar un área
export async function updateAreaRequest(id: string, areaData: Partial<Area>): Promise<Area> {
    const response = await fetch(`${API_URL}/areas/${id}`, {
        method: 'PATCH', // O PUT según tu backend
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(areaData),
    });

    if (!response.ok) {
        throw new Error('No se pudo actualizar el área');
    }

    return await response.json();
}

// Eliminar un área
export async function deleteAreaRequest(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/areas/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('No se pudo eliminar el área');
    }
}