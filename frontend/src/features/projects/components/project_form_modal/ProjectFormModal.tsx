import React, { useState, useEffect } from 'react';
import { CustomModal } from '@/components/custom_modal/CustomModal';
import { Trash2 } from 'lucide-react';
import type { Project } from '../../types/project.types';
import type { Area } from '../../hooks/useProjectAreas';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null; // Si viene, estamos editando; si no, creando
  onSave: (projectData: Project) => void;
  onDelete?: (projectId: string) => void;
  areas: Area[];
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  onClose,
  project,
  onSave,
  onDelete,
  areas
}) => {
  const isEditing = !!project;

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    estado: 'PENDIENTE',
    prioridad: 'media',
    areaId: '',
    lider: '',
    tipo: 'INTERNO',
    integrantes: '',
    url: '',
    servidor: '',
    semanas: '',
    fechaEntrega: '',
    levantamiento: 0,
    progreso: 0,
    implementacion: 0,
    observacion: '',
  });

  useEffect(() => {
    if (project) {
      setFormData({
        nombre: project.nombre || '',
        descripcion: project.descripcion || '',
        estado: project.estado || 'PENDIENTE',
        prioridad: project.prioridad || 'media',
        areaId: project.area_id || (areas.length > 0 ? areas[0].id : ''),
        lider: project.lider || '',
        tipo: project.tipo || 'INTERNO',
        integrantes: project.integrantes ? project.integrantes.join(', ') : '',
        url: project.url || '',
        servidor: project.servidor || '',
        semanas: project.semanas_estimadas?.toString() || '',
        fechaEntrega: project.fecha_entrega ? project.fecha_entrega.split('T')[0] : '',
        levantamiento: project.pct_levantamiento ?? 0,
        progreso: project.pct_progreso ?? 0,
        implementacion: project.pct_implementacion ?? 0,
        observacion: project.observacion || '',
      });
    } else {
      // Resetear si es nuevo proyecto
      setFormData({
        nombre: '',
        descripcion: '',
        estado: 'PENDIENTE',
        prioridad: 'media',
        areaId: areas.length > 0 ? areas[0].id : '',
        lider: '',
        tipo: 'INTERNO',
        integrantes: '',
        url: '',
        servidor: '',
        semanas: '',
        fechaEntrega: '',
        levantamiento: 0,
        progreso: 0,
        implementacion: 0,
        observacion: '',
      });
    }
  }, [project, isOpen, areas]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Procesamos los integrantes de texto plano a array
    const integrantesArray = formData.integrantes
      ? formData.integrantes.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    // Estructuramos el objeto área acorde a la interfaz Area
    const selectedAreaObj = areas.find((a) => a.id === formData.areaId) || {
      id: formData.areaId,
      nombre: 'Sin área',
      color: '#006772',
    };

    const payload: Project = {
      id: project ? project.id : crypto.randomUUID(),
      created_at: project ? project.created_at : new Date().toISOString(),
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      estado: formData.estado,
      prioridad: formData.prioridad,
      area_id: selectedAreaObj.id,
      area: selectedAreaObj,
      lider: formData.lider,
      tipo: formData.tipo,
      integrantes: integrantesArray,
      url: formData.url || null,
      servidor: formData.servidor || null,
      semanas_estimadas: formData.semanas ? Number(formData.semanas) : null,
      fecha_entrega: formData.fechaEntrega || null,
      pct_levantamiento: Number(formData.levantamiento),
      pct_progreso: Number(formData.progreso),
      pct_implementacion: Number(formData.implementacion),
      observacion: formData.observacion,
      updated_at: new Date().toISOString(),
    };

    onSave(payload);
    onClose();
  };

  return (
    <CustomModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isEditing ? "Editar proyecto" : "Nuevo proyecto"} 
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Nombre */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium leading-none" htmlFor="pf-nombre">
            Nombre
          </label>
          <input
            id="pf-nombre"
            type="text"
            value={formData.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
            required
          />
        </div>

        {/* Explicación breve */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium leading-none" htmlFor="pf-desc">
            Explicación breve
          </label>
          <textarea
            id="pf-desc"
            rows={2}
            value={formData.descripcion}
            onChange={(e) => handleChange('descripcion', e.target.value)}
            className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />
        </div>

        {/* Estado, Prioridad, Área */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none">Estado</label>
            <select
              value={formData.estado}
              onChange={(e) => handleChange('estado', e.target.value)}
              className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="PENDIENTE">Pendiente</option>
              <option value="EN DESARROLLO">En desarrollo</option>
              <option value="FINALIZADO">Finalizado</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none">Prioridad</label>
            <select
              value={formData.prioridad}
              onChange={(e) => handleChange('prioridad', e.target.value)}
              className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring capitalize"
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none">Área / Categoría</label>
            <select
              value={formData.areaId}
              onChange={(e) => handleChange('areaId', e.target.value)}
              className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="" disabled>Selecciona un área</option>
              {areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Líder y Tipo */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none" htmlFor="pf-lider">
              Líder
            </label>
            <input
              id="pf-lider"
              type="text"
              value={formData.lider}
              onChange={(e) => handleChange('lider', e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none">Tipo</label>
            <select
              value={formData.tipo}
              onChange={(e) => handleChange('tipo', e.target.value)}
              className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="INTERNO">Interno</option>
              <option value="EXTERNO">Externo</option>
            </select>
          </div>
        </div>

        {/* Integrantes */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium leading-none" htmlFor="pf-integrantes">
            Integrantes (separados por coma)
          </label>
          <input
            id="pf-integrantes"
            type="text"
            placeholder="Nombre 1, Nombre 2…"
            value={formData.integrantes}
            onChange={(e) => handleChange('integrantes', e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />
        </div>

        {/* URL y Servidor */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none" htmlFor="pf-url">
              URL (si aplica)
            </label>
            <input
              id="pf-url"
              type="text"
              placeholder="https://…"
              value={formData.url}
              onChange={(e) => handleChange('url', e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none" htmlFor="pf-servidor">
              Servidor donde se aloja (si aplica)
            </label>
            <input
              id="pf-servidor"
              type="text"
              value={formData.servidor}
              onChange={(e) => handleChange('servidor', e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
            />
          </div>
        </div>

        {/* Semanas y Fecha */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none" htmlFor="pf-semanas">
              Tiempo estimado de desarrollo (semanas)
            </label>
            <input
              id="pf-semanas"
              type="number"
              min="0"
              value={formData.semanas}
              onChange={(e) => handleChange('semanas', e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none" htmlFor="pf-fecha">
              Fecha estimada de entrega
            </label>
            <input
              id="pf-fecha"
              type="date"
              value={formData.fechaEntrega}
              onChange={(e) => handleChange('fechaEntrega', e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
            />
          </div>
        </div>

        {/* Porcentajes */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none">% Levantamiento</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.levantamiento}
              onChange={(e) => handleChange('levantamiento', e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none">% Progreso</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.progreso}
              onChange={(e) => handleChange('progreso', e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none">% Implementación</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.implementacion}
              onChange={(e) => handleChange('implementacion', e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Observaciones */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium leading-none" htmlFor="pf-obs">
            Estado actual / observación
          </label>
          <textarea
            id="pf-obs"
            rows={2}
            value={formData.observacion}
            onChange={(e) => handleChange('observacion', e.target.value)}
            className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />
        </div>

        {/* Botones de Guardar y Eliminar */}
        <div className="flex items-center gap-2 pt-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors bg-[#006772] text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 flex-1"
          >
            {isEditing ? "Guardar cambios" : "Crear proyecto"}
          </button>
          
          {isEditing && onDelete && project && (
            <button
              type="button"
              onClick={() => {
                if (confirm('¿Estás seguro de eliminar este proyecto?')) {
                  onDelete(project.id);
                  onClose();
                }
              }}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors border border-input bg-background shadow-sm hover:bg-accent h-9 px-4 py-2 text-destructive"
            >
              <Trash2 className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </form>
    </CustomModal>
  );
};