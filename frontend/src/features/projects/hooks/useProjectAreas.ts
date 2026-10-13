import { useCallback, useEffect, useState } from 'react';
import { createAreaRequest, deleteAreaRequest, getAreas, updateAreaRequest } from '../api/area.api';

export interface Area {
	id: string;
	nombre: string;
	color: string;
}

export const useProjectAreas = () => {
	/*const [areas, setAreas] = useState<Area[]>([
		{ id: "3f609bd5-21ff-42c8-913b-4f9320a27799", nombre: "BI", color: "#ff14e0" },
		{ id: "02894617-394b-402f-a945-78f294a2299c", nombre: "Desarrollo", color: "#004747" },
		{ id: "34705397-1330-41ae-9292-c5119dedbe9c", nombre: "Implementación", color: "#00fae9" },
		{ id: "df2354a5-fbcb-4ba5-bd08-f15709375c04", nombre: "Infraestructura", color: "#fa9e00" },
		{ id: "31588ec4-534e-4c69-a613-f22f980c819e", nombre: "Soporte", color: "#ff0000" },
	]);*/
	const [areas, setAreas] = useState<Area[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
	const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);

	// Cargar áreas desde el backend
    const fetchAreas = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAreas();
            setAreas(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Error de conexión con el backend de áreas');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAreas();
    }, [fetchAreas]);

    // Crear área
    const handleAddArea = async (newArea: Omit<Area, 'id'>) => {
        try {
            const createdArea = await createAreaRequest(newArea);
            setAreas((prev) => [...prev, createdArea]);
            return { success: true, data: createdArea };
        } catch (err: any) {
            console.error(err);
            return { success: false, error: err.message };
        }
    };

    // Actualizar área
    const handleUpdateArea = async (id: string, updatedFields: Partial<Area>) => {
        try {
            const updatedArea = await updateAreaRequest(id, updatedFields);
            setAreas((prev) =>
                prev.map((a) => (a.id === id ? updatedArea : a))
            );
            return { success: true, data: updatedArea };
        } catch (err: any) {
            console.error(err);
            return { success: false, error: err.message };
        }
    };

    // Eliminar área
    const handleDeleteArea = async (id: string) => {
        try {
            await deleteAreaRequest(id);
            setAreas((prev) => prev.filter((a) => a.id !== id));
            return { success: true };
        } catch (err: any) {
            console.error(err);
            return { success: false, error: err.message };
        }
    };

    return {
        areas,
        loading,
        error,
        isAreaModalOpen,
        setIsAreaModalOpen,
        refreshAreas: fetchAreas,
        handleAddArea,
        handleUpdateArea,
        handleDeleteArea,
    };
};