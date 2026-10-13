import { useState, useEffect, useCallback } from 'react';
import type { CreateProjectInput, Project } from '../types/project.types';
import { createProjectRequest, getProjects, updateProjectRequest, deleteProjectRequest } from '../api/project.api';

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getProjects();
            setProjects(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Error de conexión con el backend');
        } finally {
            setLoading(false);
        }
    }, []);

    const createProject = async (projectData: CreateProjectInput) => {
        try {
            setError(null);
            const newProject = await createProjectRequest(projectData);
            setProjects((prev) => [newProject, ...prev]);
            return { success: true, data: newProject };
        } catch (err: any) {
            console.error(err);
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    const updateProject = async (id: string, projectData: Partial<CreateProjectInput>) => {
        try {
            setError(null);
            const updated = await updateProjectRequest(id, projectData);
            setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
            return { success: true, data: updated };
        } catch (err: any) {
            console.error(err);
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    const deleteProject = async (id: string) => {
        try {
            setError(null);
            await deleteProjectRequest(id);
            setProjects((prev) => prev.filter((p) => p.id !== id));
            return { success: true };
        } catch (err: any) {
            console.error(err);
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return { 
        projects, 
        setProjects, 
        loading, 
        error, 
        refresProjects: fetchProjects, 
        createProject, 
        updateProject, 
        deleteProject 
    };
}