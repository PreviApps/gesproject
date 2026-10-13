import React, { useState } from 'react';
import { Timer, CalendarDays, Pencil, Server, Users } from 'lucide-react';
import { CustomSheet } from '@/components/custom_sheet/CustomSheet';
import type { Project, SessionFeedback } from '../../types/project.types';

interface ProjectDetailsSheetProps {
	isOpen: boolean;
	onClose: () => void;
	project: Project | null;
	feedbacks?: SessionFeedback[];
	onEdit?: (project: Project) => void;
	onSaveNote?: (noteData: any) => void;
}

export const ProjectDetailsSheet: React.FC<ProjectDetailsSheetProps> = ({
	isOpen,
	onClose,
	project,
	feedbacks = [],
	onEdit,
	onSaveNote,
}) => {
	const [noteForm, setNoteForm] = useState({
		autor: '',
		categoria: 'Comentario',
		observacion: '',
	});

	if (!project) return null;

	const formatDate = (dateString: string | null | undefined) => {
		if (!dateString) return 'No definida';
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('es-ES', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		}).format(date);
	};

	const generalProgress = Math.round(
		(project.pct_levantamiento + project.pct_progreso + project.pct_implementacion) / 3
	);

	const activeColor = project.estado === 'FINALIZADO' ? '#2a9d67' : '#d6810c';

	const handleNoteSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (onSaveNote) onSaveNote({ projectId: project.id, ...noteForm });
		setNoteForm({ autor: '', categoria: 'Comentario', observacion: '' });
	};

	return (
		<CustomSheet isOpen={isOpen} onClose={onClose}>
			<div className="flex flex-col sm:text-left space-y-3 text-left text-slate-700">
				{/* Badges superiores */}
				<div className="flex flex-wrap items-center gap-1.5">
					<div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground">
						{project.estado}
					</div>
					<div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold text-foreground">
						<span
							className="mr-1 inline-block size-2 rounded-full"
							style={{ backgroundColor: project.area?.color }}
						></span>
						{project.area?.nombre}
					</div>
					<div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold text-foreground uppercase">
						{project.tipo}
					</div>
					<div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold text-foreground capitalize">
						Prioridad {project.prioridad}
					</div>
				</div>

				{/* Título y Botón Editar */}
				<div className="flex items-start justify-between gap-3">
					<h2 className="font-semibold text-foreground text-xl leading-tight">
						{project.nombre}
					</h2>
					<button
						onClick={() => onEdit?.(project)}
						className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
						aria-label="Editar proyecto"
					>
						<Pencil className="size-3.5" aria-hidden="true" /> Editar
					</button>
				</div>
			</div>

			{/* Contenido Principal */}
			<div className="space-y-6 px-4 pb-8 mt-4">
				{/* Descripción */}
				<p className="text-sm leading-relaxed text-muted-foreground text-slate-700">
					{project.descripcion}
				</p>

				{/* Bloque de Avance General y Fases */}
				<div className="grid gap-3 rounded-xl border border-border bg-card-soft p-4 text-slate-700">
					<div className="flex items-baseline justify-between">
						<span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
							Avance general
						</span>
						<span className="text-2xl font-semibold" style={{ color: activeColor }}>
							{generalProgress}%
						</span>
					</div>

					{/* Levantamiento */}
					<div>
						<div className="flex items-center justify-between text-xs font-medium">
							<span className="text-muted-foreground">Levantamiento</span>
							<span>{project.pct_levantamiento}%</span>
						</div>
						<div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
							<div
								className="h-full rounded-full"
								style={{ width: `${project.pct_levantamiento}%`, backgroundColor: activeColor }}
							></div>
						</div>
					</div>

					{/* Progreso */}
					<div>
						<div className="flex items-center justify-between text-xs font-medium">
							<span className="text-muted-foreground">Progreso</span>
							<span>{project.pct_progreso}%</span>
						</div>
						<div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
							<div
								className="h-full rounded-full"
								style={{ width: `${project.pct_progreso}%`, backgroundColor: activeColor }}
							></div>
						</div>
					</div>

					{/* Implementación */}
					<div>
						<div className="flex items-center justify-between text-xs font-medium">
							<span className="text-muted-foreground">Implementación</span>
							<span>{project.pct_implementacion}%</span>
						</div>
						<div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
							<div
								className="h-full rounded-full"
								style={{ width: `${project.pct_implementacion}%`, backgroundColor: activeColor }}
							></div>
						</div>
					</div>
				</div>

				{/* Metadatos (Líder, Tiempo, Fecha) */}
				<div className="grid gap-3 text-sm sm:grid-cols-2 text-slate-700">
					<div>
						<p className="text-xs uppercase tracking-wide text-muted-foreground">Líder</p>
						<p className="font-medium">{project.lider || 'No asignado'}</p>
					</div>
					<div>
						<p className="text-xs uppercase tracking-wide text-muted-foreground">Tiempo estimado</p>
						<p className="inline-flex items-center gap-1.5 font-medium">
							<Timer className="size-3.5" aria-hidden="true" /> {project.semanas_estimadas ?? 0} semanas
						</p>
					</div>
					<div>
						<p className="text-xs uppercase tracking-wide text-muted-foreground">Entrega estimada</p>
						<p className="inline-flex items-center gap-1.5 font-medium">
							<CalendarDays className="size-3.5" aria-hidden="true" /> {formatDate(project.fecha_entrega)}
						</p>
					</div>
					<div>
						<p className="text-xs uppercase tracking-wide text-muted-foreground">Servidor</p>
						<p className="inline-flex items-center gap-1.5 font-medium">
							<Server className="size-3.5" aria-hidden="true" /> {project.servidor}
						</p>
					</div>
					<div>
						<p className="text-xs uppercase tracking-wide text-muted-foreground">Integrantes</p>
						<p className="inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#ddf1f4] text-secondary-foreground hover:bg-secondary/80 text-[11px]">
							<Users className="size-3.5" aria-hidden="true" /> {project.integrantes && project.integrantes.length > 0
								? project.integrantes.join(', ')
								: 'Ninguno'}
						</p>
					</div>
				</div>

				{/* Estado actual / Observaciones */}
				<div className="rounded-xl border border-border bg-secondary/60 p-4 text-slate-700">
					<p className="text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
						Estado actual / Observación
					</p>
					<p className="mt-1 text-sm leading-relaxed">
						{project.observacion || 'Sin observaciones registradas.'}
					</p>
				</div>

				{/* Formulario de Feedback de Gerencia */}
				<form onSubmit={handleNoteSubmit} className="space-y-3 rounded-xl border border-border p-4 text-slate-700">
					<h4 className="text-sm font-semibold">Registrar feedback de gerencia</h4>
					<div className="grid gap-3 sm:grid-cols-2">
						<div className="space-y-1.5">
							<label className="text-xs font-medium" htmlFor="autor">Quién comenta</label>
							<input
								id="autor"
								type="text"
								placeholder="Nombre"
								value={noteForm.autor}
								onChange={(e) => setNoteForm({ ...noteForm, autor: e.target.value })}
								className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm text-slate-700"
							/>
						</div>
						<div className="space-y-1.5">
							<label className="text-xs font-medium">Categoría</label>
							<select
								value={noteForm.categoria}
								onChange={(e) => setNoteForm({ ...noteForm, categoria: e.target.value })}
								className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
							>
								<option value="Comentario">Comentario</option>
								<option value="Decisión">Decisión</option>
								<option value="Solicitud">Solicitud</option>
							</select>
						</div>
					</div>
					<textarea
						placeholder="Observación, decisión o solicitud…"
						rows={3}
						value={noteForm.observacion}
						onChange={(e) => setNoteForm({ ...noteForm, observacion: e.target.value })}
						className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
					/>
					<button
						type="submit"
						className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full bg-[#006772] text-white"
					>
						Guardar nota
					</button>
				</form>

				{/* Listado de Notas (aquí conectarías tus notas reales si las tienes) */}
				<div className="space-y-2 text-slate-700">
					<h4 className="text-sm font-semibold">
						Notas de este proyecto <span className="text-muted-foreground">({feedbacks.length})</span>
					</h4>
					{feedbacks.length === 0 ? (
                        <p className="text-xs text-muted-foreground">Aún no hay feedback registrado para este proyecto.</p>
                    ) : (
                        <div className="space-y-2.5">
                            {feedbacks.map((fb) => (
                                <div key={fb.id} className="rounded-lg border border-border bg-slate-50 p-3 space-y-1 text-xs">
                                    <div className="flex items-center justify-between font-medium">
                                        <span className="text-slate-900 font-semibold">{fb.autor}</span>
                                        <span className="rounded bg-secondary px-2 py-0.5 text-[10px] text-secondary-foreground font-semibold">
                                            {fb.categoria}
                                        </span>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed">{fb.comentario}</p>
                                    <span className="block text-[10px] text-muted-foreground pt-1 text-right">
                                        {new Date(fb.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
				</div>
			</div>
		</CustomSheet>
	);
};